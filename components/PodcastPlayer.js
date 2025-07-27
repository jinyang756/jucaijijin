import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

const PodcastPlayer = ({ currentEpisode, episodes }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(currentEpisode?.duration || 0);
  const [activeEpisode, setActiveEpisode] = useState(currentEpisode);
  const audioRef = useRef(null);

  // 格式化时间显示
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // 播放/暂停切换
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // 处理进度条变化
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  // 处理进度条拖动
  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // 加载新集数
  const loadEpisode = (episode) => {
    setActiveEpisode(episode);
    setCurrentTime(0);
    setDuration(episode.duration);
    audioRef.current.src = episode.audioUrl;
    audioRef.current.load();
    setIsPlaying(true);
    audioRef.current.play();
  };

  // 计算进度百分比
  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <Card className="shadow-lg border-0 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl">
      <CardHeader className="bg-gradient-to-r from-blue-900 to-blue-800 text-white pb-4">
        <CardTitle className="text-xl font-bold flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
          </svg>
          经视故事汇
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="player" className="w-full">
          <TabsList className="w-full grid grid-cols-2 bg-gray-100">
            <TabsTrigger value="player" className="data-[state=active]:bg-white">播放器</TabsTrigger>
            <TabsTrigger value="episodes" className="data-[state=active]:bg-white">往期节目</TabsTrigger>
          </TabsList>

          <TabsContent value="player" className="m-0 p-6 space-y-6">
            {activeEpisode && (
              <div className="space-y-6">
                {/* 播客封面和信息 */}
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="relative w-48 h-48 rounded-lg overflow-hidden shadow-lg flex-shrink-0 border-4 border-white">
                    <Image
                      src={activeEpisode.coverImage}
                      alt={activeEpisode.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center md:text-left flex-grow">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{activeEpisode.title}</h2>
                    <p className="text-gray-600 mb-4">{activeEpisode.description}</p>
                    <div className="flex items-center justify-center md:justify-start space-x-4 text-sm text-gray-500">
                      <span>发布日期: {new Date(activeEpisode.publishDate).toLocaleDateString()}</span>
                      <span>时长: {formatTime(activeEpisode.duration)}</span>
                    </div>
                  </div>
                </div>

                {/* 音频播放器控件 */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <audio
                    ref={audioRef}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={() => setDuration(audioRef.current.duration)}
                    className="hidden"
                  />

                  {/* 进度条 */}
                  <div className="mb-4 space-y-1">
                    <input
                      type="range"
                      min="0"
                      max={duration}
                      value={currentTime}
                      onChange={handleProgressChange}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  {/* 控制按钮 */}
                  <div className="flex items-center justify-center space-x-8">
                    <button className="text-gray-500 hover:text-blue-900 transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5L6 9H2v6h4l5 4zm0 0V9m11 11l-5-4H12v-6h4l5-4z" />
                      </svg>
                    </button>

                    <button
                      onClick={togglePlay}
                      className="w-14 h-14 rounded-full bg-blue-900 text-white flex items-center justify-center shadow-lg hover:bg-blue-800 transition-all transform hover:scale-105"
                    >
                      {isPlaying ? (
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        </svg>
                      ) : (
                        <svg className="w-8 h-8 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707a1 1 0 011.414 0l4.707 4.707H19a1 1 0 011 1v4a1 1 0 01-1 1h-1.586l-4.707 4.707a1 1 0 01-1.414 0l-4.707-4.707z" />
                        </svg>
                      )}
                    </button>

                    <button className="text-gray-500 hover:text-blue-900 transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* 文字稿区域 */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">节目文字稿</h3>
                  <ScrollArea className="h-64 border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
                      {activeEpisode.transcript.split('\n').map((paragraph, i) => (
                        <p key={i} className="mb-4">{paragraph}</p>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="episodes" className="m-0 p-0">
            <ScrollArea className="h-[500px]">
              <div className="divide-y divide-gray-100">
                {episodes.map((episode, index) => (
                  <button
                    key={index}
                    onClick={() => loadEpisode(episode)}
                    className={`w-full text-left p-4 hover:bg-blue-50 transition-colors ${activeEpisode.id === episode.id ? 'bg-blue-50 border-l-4 border-blue-600' : ''}`}
                  >
                    <div className="flex gap-4">
                      <div className="relative w-20 h-20 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={episode.coverImage}
                          alt={episode.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{episode.title}</h3>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{episode.description}</p>
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>{new Date(episode.publishDate).toLocaleDateString()}</span>
                          <span>{formatTime(episode.duration)}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PodcastPlayer;