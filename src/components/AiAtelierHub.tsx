import React, { useState, useRef, useEffect } from 'react';
import { AudioCaptureService, LiveAudioPlayer } from '../utils/recorder';

interface AiAtelierHubProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'music' | 'image' | 'video' | 'live' | 'search' | 'transcribe' | 'chat';
  onApplyImageToStory?: (imageUrl: string) => void;
  onApplyManuscriptText?: (text: string) => void;
}

export const AiAtelierHub: React.FC<AiAtelierHubProps> = ({
  isOpen,
  onClose,
  initialTab = 'music',
  onApplyImageToStory,
  onApplyManuscriptText,
}) => {
  const [activeTab, setActiveTab] = useState<
    'music' | 'image' | 'video' | 'live' | 'search' | 'transcribe' | 'chat'
  >(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-black/80 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="bg-app-surface border border-primary/30 w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col my-auto max-h-[92vh] overflow-hidden text-app transition-colors duration-500">
        {/* Header */}
        <div className="px-6 py-4 border-b border-app flex items-center justify-between bg-app-container">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
            </div>
            <div>
              <h2 className="font-headline-sm text-lg text-app">The AI Storyteller Atelier</h2>
              <span className="text-[11px] text-primary uppercase tracking-wider font-semibold">
                Multimodal Creative Laboratories
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-app-high text-app-muted hover:text-primary flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Tab Navigation Ribbon */}
        <div className="flex items-center gap-1 px-4 py-2 bg-app-container border-b border-app overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('music')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'music'
                ? 'bg-primary text-[#452b00] font-semibold'
                : 'text-on-surface-variant hover:text-[#dde2f8]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">music_note</span>
            <span>Lyria Music</span>
          </button>

          <button
            onClick={() => setActiveTab('image')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'image'
                ? 'bg-primary text-[#452b00] font-semibold'
                : 'text-on-surface-variant hover:text-[#dde2f8]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">image_edit_auto</span>
            <span>Create &amp; Edit Image</span>
          </button>

          <button
            onClick={() => setActiveTab('video')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'video'
                ? 'bg-primary text-[#452b00] font-semibold'
                : 'text-on-surface-variant hover:text-[#dde2f8]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">movie</span>
            <span>Veo 3 Video</span>
          </button>

          <button
            onClick={() => setActiveTab('live')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'live'
                ? 'bg-primary text-[#452b00] font-semibold'
                : 'text-on-surface-variant hover:text-[#dde2f8]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">audio_spark</span>
            <span>Live Voice API</span>
          </button>

          <button
            onClick={() => setActiveTab('search')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'search'
                ? 'bg-primary text-[#452b00] font-semibold'
                : 'text-on-surface-variant hover:text-[#dde2f8]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">travel_explore</span>
            <span>Google Search</span>
          </button>

          <button
            onClick={() => setActiveTab('transcribe')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'transcribe'
                ? 'bg-primary text-[#452b00] font-semibold'
                : 'text-on-surface-variant hover:text-[#dde2f8]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">speech_to_text</span>
            <span>Transcribe Audio</span>
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'chat'
                ? 'bg-primary text-[#452b00] font-semibold'
                : 'text-on-surface-variant hover:text-[#dde2f8]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">voice_chat</span>
            <span>Socratic Chat</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'music' && <LyriaMusicLab />}
          {activeTab === 'image' && <ImageStudioLab onApplyImage={onApplyImageToStory} />}
          {activeTab === 'video' && <VeoVideoLab />}
          {activeTab === 'live' && <LiveVoiceLab />}
          {activeTab === 'search' && <SearchGroundingLab />}
          {activeTab === 'transcribe' && <TranscribeLab onInsert={onApplyManuscriptText} />}
          {activeTab === 'chat' && <SocraticChatLab />}
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 1. Lyria Music Generator
// -------------------------------------------------------------
function LyriaMusicLab() {
  const [prompt, setPrompt] = useState(
    'Gentle melancholic music box chime with warm pine forest cello and ticking clocks, 100bpm, nostalgic medieval fairy tale'
  );
  const [model, setModel] = useState<'lyria-3-clip-preview' | 'lyria-3-pro-preview'>('lyria-3-clip-preview');
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [lyrics, setLyrics] = useState('');
  const [error, setError] = useState<string | null>(null);

  const presets = [
    'Gentle pine forest cello with clock ticking and soft wooden flute',
    'Astronomical clock chime with shimmering crystal bell harmonies',
    'Solemn winter mountain hymn played on acoustic lute and cedar harp',
  ];

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/music/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, model }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to compose music');

      const binary = atob(data.audioBase64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: data.mimeType || 'audio/wav' });
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      setLyrics(data.lyrics || '');
    } catch (err: any) {
      setError(err?.message || 'Music generation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h3 className="font-headline-sm text-xl text-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">music_note</span>
          Lyria Story Atmosphere Music Composer
        </h3>
        <p className="text-xs text-on-surface-variant">
          Compose original instrumental melodies and ambient tracks using Google Lyria models ({model}).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-on-surface-variant font-medium">Model Variant</label>
          <div className="flex gap-2 mt-1">
            <button
              onClick={() => setModel('lyria-3-clip-preview')}
              className={`flex-1 p-2.5 rounded-xl border text-xs text-left transition-all ${
                model === 'lyria-3-clip-preview'
                  ? 'bg-primary/20 border-primary text-primary font-semibold'
                  : 'bg-[#080e1d] border-[#dde2f8]/10 text-on-surface-variant'
              }`}
            >
              <div className="font-bold">lyria-3-clip-preview</div>
              <div className="text-[10px] opacity-70">Up to 30s atmospheric clip</div>
            </button>
            <button
              onClick={() => setModel('lyria-3-pro-preview')}
              className={`flex-1 p-2.5 rounded-xl border text-xs text-left transition-all ${
                model === 'lyria-3-pro-preview'
                  ? 'bg-primary/20 border-primary text-primary font-semibold'
                  : 'bg-[#080e1d] border-[#dde2f8]/10 text-on-surface-variant'
              }`}
            >
              <div className="font-bold">lyria-3-pro-preview</div>
              <div className="text-[10px] opacity-70">Full-length orchestral score</div>
            </button>
          </div>
        </div>

        <div>
          <label className="text-xs text-on-surface-variant font-medium">Preset Themes</label>
          <div className="flex flex-col gap-1 mt-1">
            {presets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => setPrompt(preset)}
                className="text-left text-[11px] p-1.5 rounded-lg bg-[#080e1d] hover:bg-[#191f2f] text-on-surface-variant/90 hover:text-primary truncate transition-colors"
              >
                ♪ {preset}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label className="text-xs text-on-surface-variant font-medium">Music Generation Prompt</label>
        <textarea
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe instruments, tempo, moods, setting..."
          className="w-full mt-1 p-3 rounded-xl bg-[#080e1d] border border-[#dde2f8]/10 text-xs text-[#dde2f8] focus:outline-none focus:border-primary leading-relaxed"
        />
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-[#690005]/40 border border-[#ffb4ab]/40 text-[#ffdad6] text-xs">
          {error}
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className="text-xs text-on-surface-variant/70">
          Model: <span className="font-mono text-primary">{model}</span>
        </span>
        <button
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
          className="px-5 py-2.5 rounded-xl bg-primary text-[#452b00] text-xs font-semibold hover:bg-primary-container disabled:opacity-50 transition-all flex items-center gap-1.5"
        >
          {loading ? (
            <>
              <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>
              <span>Composing Score...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[16px]">play_circle</span>
              <span>Generate Music</span>
            </>
          )}
        </button>
      </div>

      {audioUrl && (
        <div className="p-4 rounded-xl bg-[#080e1d] border border-primary/30 flex flex-col gap-3 animate-fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-primary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">graphic_eq</span>
              Composed Track Playback
            </span>
            <a
              href={audioUrl}
              download="mythos_lyria_track.wav"
              className="text-xs text-primary hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">download</span>
              Save Track
            </a>
          </div>
          <audio controls src={audioUrl} className="w-full mt-1" autoPlay />
          {lyrics && (
            <div className="p-2.5 rounded-lg bg-[#151b2b] text-xs text-on-surface-variant italic">
              Lyrics: {lyrics}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// 2. Image Creation & Editing Studio
// -------------------------------------------------------------
function ImageStudioLab({ onApplyImage }: { onApplyImage?: (url: string) => void }) {
  const [prompt, setPrompt] = useState(
    'A cinematic, moody dark fantasy painting of Master Tobias examining an intricate brass celestial gear in a candlelit pine workshop'
  );
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '16:9' | '9:16' | '4:3' | '3:4'>('16:9');
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '512px'>('1K');
  const [baseImageBase64, setBaseImageBase64] = useState<string | null>(null);
  const [baseImagePreview, setBaseImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [description, setDescription] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setBaseImagePreview(result);
      setBaseImageBase64(result.split(',')[1] || '');
      setPrompt('Enhance with warm candlelight embers, golden suspended dust motes, and twilight pine shadows');
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/images/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          aspectRatio,
          imageSize,
          baseImageBase64,
          baseImageMimeType: 'image/png',
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate/edit image');
      setResultImage(data.imageUrl);
      setDescription(data.textDescription || '');
    } catch (err: any) {
      setError(err?.message || 'Image generation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h3 className="font-headline-sm text-xl text-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">image_edit_auto</span>
          Gemini 3.1 Flash Image Creation &amp; Editing
        </h3>
        <p className="text-xs text-on-surface-variant">
          Model: <span className="font-mono text-primary">gemini-3.1-flash-image-preview</span>. Generate new illustrations or upload an image to edit with natural language instructions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="text-xs text-on-surface-variant font-medium">Aspect Ratio</label>
          <select
            value={aspectRatio}
            onChange={(e) => setAspectRatio(e.target.value as any)}
            className="w-full mt-1 px-3 py-2 rounded-xl bg-[#080e1d] border border-[#dde2f8]/10 text-xs text-[#dde2f8] focus:outline-none focus:border-primary"
          >
            <option value="16:9">16:9 (Cinematic Landscape)</option>
            <option value="1:1">1:1 (Square Folio)</option>
            <option value="9:16">9:16 (Tall Scroll)</option>
            <option value="4:3">4:3 (Classic Academy)</option>
            <option value="3:4">3:4 (Portrait Page)</option>
          </select>
        </div>

        <div>
          <label className="text-xs text-on-surface-variant font-medium">Resolution Target</label>
          <select
            value={imageSize}
            onChange={(e) => setImageSize(e.target.value as any)}
            className="w-full mt-1 px-3 py-2 rounded-xl bg-[#080e1d] border border-[#dde2f8]/10 text-xs text-[#dde2f8] focus:outline-none focus:border-primary"
          >
            <option value="1K">1K Ultra Crisp</option>
            <option value="2K">2K Editorial Master</option>
            <option value="512px">512px Fast Thumbnail</option>
          </select>
        </div>

        <div>
          <label className="text-xs text-on-surface-variant font-medium">Image-to-Image / Editing</label>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full mt-1 px-3 py-2 rounded-xl bg-[#080e1d] border border-dashed border-[#dde2f8]/20 hover:border-primary text-xs text-on-surface-variant hover:text-primary flex items-center justify-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">upload_file</span>
            <span>{baseImagePreview ? 'Change Input Image' : 'Upload Image to Edit'}</span>
          </button>
        </div>
      </div>

      {baseImagePreview && (
        <div className="p-3 rounded-xl bg-[#080e1d] border border-primary/20 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img src={baseImagePreview} alt="Base" className="w-12 h-12 object-cover rounded-lg" />
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-primary">Editing Mode Active</span>
              <span className="text-[10px] text-on-surface-variant">The prompt below will instruct the edit</span>
            </div>
          </div>
          <button
            onClick={() => {
              setBaseImagePreview(null);
              setBaseImageBase64(null);
            }}
            className="text-xs text-on-surface-variant hover:text-[#ffb4ab]"
          >
            Clear Image
          </button>
        </div>
      )}

      <div>
        <label className="text-xs text-on-surface-variant font-medium">Text Prompt / Editing Command</label>
        <textarea
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. An ancient astronomical escapement surrounded by starlight..."
          className="w-full mt-1 p-3 rounded-xl bg-[#080e1d] border border-[#dde2f8]/10 text-xs text-[#dde2f8] focus:outline-none focus:border-primary leading-relaxed"
        />
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-[#690005]/40 border border-[#ffb4ab]/40 text-[#ffdad6] text-xs">
          {error}
        </div>
      )}

      <div className="flex items-center justify-end">
        <button
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
          className="px-5 py-2.5 rounded-xl bg-primary text-[#452b00] text-xs font-semibold hover:bg-primary-container disabled:opacity-50 transition-all flex items-center gap-1.5"
        >
          {loading ? (
            <>
              <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>
              <span>Rendering Artwork...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[16px]">brush</span>
              <span>{baseImageBase64 ? 'Apply Image Edit' : 'Generate Illustration'}</span>
            </>
          )}
        </button>
      </div>

      {resultImage && (
        <div className="p-4 rounded-xl bg-[#080e1d] border border-primary/30 flex flex-col gap-3 animate-fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-primary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">palette</span>
              Generated Scene
            </span>
            <div className="flex items-center gap-2">
              {onApplyImage && (
                <button
                  onClick={() => onApplyImage(resultImage)}
                  className="px-3 py-1 rounded-lg bg-primary/20 text-primary text-xs font-semibold hover:bg-primary hover:text-[#452b00] transition-colors"
                >
                  Set as Story Cover
                </button>
              )}
              <a
                href={resultImage}
                download="mythos_illustration.png"
                className="text-xs text-primary hover:underline flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">download</span>
                Save
              </a>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden max-h-[420px] flex items-center justify-center bg-black">
            <img src={resultImage} alt="Rendered Artwork" className="w-full h-auto object-contain" />
          </div>
          {description && (
            <p className="text-xs text-on-surface-variant italic">{description}</p>
          )}
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// 3. Veo 3 Video Laboratory (veo-3.1-fast-generate-preview)
// -------------------------------------------------------------
function VeoVideoLab() {
  const [mode, setMode] = useState<'text' | 'image'>('text');
  const [prompt, setPrompt] = useState(
    'A slow cinematic camera pan across Master Tobias’s clockmaker workbench as golden amber dust motes swirl in candlebeam light'
  );
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [uploadedImageBase64, setUploadedImageBase64] = useState<string | null>(null);
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [operationName, setOperationName] = useState<string | null>(null);
  const [videoBlobUrl, setVideoBlobUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isQuotaExceeded, setIsQuotaExceeded] = useState(false);
  const [isSampleScene, setIsSampleScene] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setUploadedImagePreview(result);
      setUploadedImageBase64(result.split(',')[1] || '');
    };
    reader.readAsDataURL(file);
  };

  const handleLoadSampleScene = () => {
    setIsSampleScene(true);
    setError(null);
    setIsQuotaExceeded(false);
    // Public gentle atmospheric fire & candle scene video
    setVideoBlobUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
  };

  const handleStartGeneration = async () => {
    setLoading(true);
    setError(null);
    setIsQuotaExceeded(false);
    setIsSampleScene(false);
    setVideoBlobUrl(null);
    setStatusMessage('Initiating Veo 3 video generation with model veo-3.1-fast-generate-preview...');

    try {
      const payload: any = {
        prompt,
        aspectRatio,
      };

      if (mode === 'image' && uploadedImageBase64) {
        payload.imageBase64 = uploadedImageBase64;
        payload.imageMimeType = 'image/png';
      }

      const res = await fetch('/api/video/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.isQuota || res.status === 429) {
          setIsQuotaExceeded(true);
        }
        throw new Error(data.error || 'Failed to start video generation');
      }

      setOperationName(data.operationName);
      pollOperation(data.operationName);
    } catch (err: any) {
      setError(err?.message || 'Video generation failed');
      setLoading(false);
    }
  };

  const pollOperation = async (opName: string) => {
    const reassuringMessages = [
      'Veo is synthesizing lighting reflections on clockwork gears...',
      'Interpolating fluid atmospheric motion and pine needle sway...',
      'Rendering temporal consistency across 720p frames...',
      'Finalizing audio-visual resonance...',
    ];

    let messageIndex = 0;
    const interval = setInterval(async () => {
      try {
        messageIndex = (messageIndex + 1) % reassuringMessages.length;
        setStatusMessage(reassuringMessages[messageIndex]);

        const statusRes = await fetch('/api/video/status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ operationName: opName }),
        });

        const statusData = await statusRes.json();
        if (statusData.error) {
          clearInterval(interval);
          throw new Error(statusData.error.message || 'Video processing encountered an issue');
        }

        if (statusData.done) {
          clearInterval(interval);
          setStatusMessage('Video completed! Downloading mp4 stream...');
          downloadVideo(opName);
        }
      } catch (err: any) {
        clearInterval(interval);
        setError(err?.message || 'Polling failed');
        setLoading(false);
      }
    }, 7000);
  };

  const downloadVideo = async (opName: string) => {
    try {
      const downloadRes = await fetch('/api/video/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operationName: opName }),
      });

      if (!downloadRes.ok) throw new Error('Failed to retrieve video stream');

      const blob = await downloadRes.blob();
      const url = URL.createObjectURL(blob);
      setVideoBlobUrl(url);
      setStatusMessage('Video ready!');
    } catch (err: any) {
      setError(err?.message || 'Download failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h3 className="font-headline-sm text-xl text-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">movie</span>
          Veo 3 Video Laboratory
        </h3>
        <p className="text-xs text-on-surface-variant">
          Model: <span className="font-mono text-primary">veo-3.1-fast-generate-preview</span>. Generate video from text prompts or animate an uploaded illustration into motion.
        </p>
      </div>

      {/* Mode Selector */}
      <div className="flex gap-2">
        <button
          onClick={() => setMode('text')}
          className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
            mode === 'text'
              ? 'bg-primary/20 border-primary text-primary'
              : 'bg-[#080e1d] border-[#dde2f8]/10 text-on-surface-variant'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">video_spark</span>
          <span>Generate Video From Text</span>
        </button>

        <button
          onClick={() => setMode('image')}
          className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
            mode === 'image'
              ? 'bg-primary/20 border-primary text-primary'
              : 'bg-[#080e1d] border-[#dde2f8]/10 text-on-surface-variant'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">animation</span>
          <span>Animate Image Into Video</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-on-surface-variant font-medium">Aspect Ratio</label>
          <div className="flex gap-2 mt-1">
            <button
              onClick={() => setAspectRatio('16:9')}
              className={`flex-1 py-2 px-3 rounded-xl border text-xs text-center transition-all ${
                aspectRatio === '16:9'
                  ? 'bg-primary text-[#452b00] font-bold'
                  : 'bg-[#080e1d] border-[#dde2f8]/10 text-on-surface-variant'
              }`}
            >
              16:9 (Landscape)
            </button>
            <button
              onClick={() => setAspectRatio('9:16')}
              className={`flex-1 py-2 px-3 rounded-xl border text-xs text-center transition-all ${
                aspectRatio === '9:16'
                  ? 'bg-primary text-[#452b00] font-bold'
                  : 'bg-[#080e1d] border-[#dde2f8]/10 text-on-surface-variant'
              }`}
            >
              9:16 (Portrait)
            </button>
          </div>
        </div>

        {mode === 'image' && (
          <div>
            <label className="text-xs text-on-surface-variant font-medium">Upload Image to Animate</label>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full mt-1 py-2 px-3 rounded-xl bg-[#080e1d] border border-dashed border-[#dde2f8]/20 hover:border-primary text-xs text-on-surface-variant hover:text-primary flex items-center justify-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">upload</span>
              <span>{uploadedImagePreview ? 'Replace Photo' : 'Select Photo to Animate'}</span>
            </button>
          </div>
        )}
      </div>

      {mode === 'image' && uploadedImagePreview && (
        <div className="p-3 rounded-xl bg-[#080e1d] border border-primary/20 flex items-center gap-3">
          <img src={uploadedImagePreview} alt="Target" className="w-16 h-12 object-cover rounded-lg" />
          <div className="flex flex-col">
            <span className="text-xs text-primary font-semibold">Image Source Attached</span>
            <span className="text-[10px] text-on-surface-variant">Veo will animate this image following your motion prompt</span>
          </div>
        </div>
      )}

      <div>
        <label className="text-xs text-on-surface-variant font-medium">Motion &amp; Cinematic Prompt</label>
        <textarea
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the camera movement, action, and lighting..."
          className="w-full mt-1 p-3 rounded-xl bg-[#080e1d] border border-[#dde2f8]/10 text-xs text-[#dde2f8] focus:outline-none focus:border-primary leading-relaxed"
        />
      </div>

      {loading && (
        <div className="p-4 rounded-xl bg-[#080e1d] border border-primary/30 flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-[24px] animate-spin">
            progress_activity
          </span>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-primary">{statusMessage}</span>
            <span className="text-[10px] text-on-surface-variant">
              Veo video generation takes a few moments to preserve cinematic fidelity.
            </span>
          </div>
        </div>
      )}

      {error && (
        <div className={`p-4 rounded-xl flex flex-col gap-2.5 text-xs ${
          isQuotaExceeded
            ? 'bg-[#151b2b] border border-primary/40 text-[#dde2f8]'
            : 'bg-[#690005]/40 border border-[#ffb4ab]/40 text-[#ffdad6]'
        }`}>
          <div className="flex items-start gap-2">
            <span className={`material-symbols-outlined text-[18px] shrink-0 mt-0.5 ${
              isQuotaExceeded ? 'text-primary' : 'text-[#ffb4ab]'
            }`}>
              {isQuotaExceeded ? 'info' : 'error'}
            </span>
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-sm text-primary">
                {isQuotaExceeded ? 'Veo 3 Rate Limit / Quota Exceeded (429)' : 'Video Generation Error'}
              </span>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {isQuotaExceeded
                  ? 'Your current Gemini API key has exceeded its quota allocation for model veo-3.1-fast-generate-preview. Veo models require an active billing tier or refreshed quota. While quota resets, you can preview the curated workshop animation demo below.'
                  : error}
              </p>
            </div>
          </div>

          {isQuotaExceeded && (
            <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#dde2f8]/10">
              <button
                type="button"
                onClick={handleLoadSampleScene}
                className="px-3 py-1.5 rounded-lg bg-primary text-[#452b00] font-semibold text-xs hover:bg-primary-container transition-all flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[15px]">play_circle</span>
                <span>Preview Demonstration Scene</span>
              </button>
              <button
                type="button"
                onClick={handleStartGeneration}
                className="px-3 py-1.5 rounded-lg bg-[#242a3a] text-on-surface-variant hover:text-primary transition-all text-xs"
              >
                Retry Request
              </button>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handleLoadSampleScene}
          className="text-xs text-on-surface-variant hover:text-primary flex items-center gap-1 transition-colors"
        >
          <span className="material-symbols-outlined text-[14px]">smart_display</span>
          <span>Sample Animation</span>
        </button>

        <button
          onClick={handleStartGeneration}
          disabled={loading || !prompt.trim() || (mode === 'image' && !uploadedImageBase64)}
          className="px-5 py-2.5 rounded-xl bg-primary text-[#452b00] text-xs font-semibold hover:bg-primary-container disabled:opacity-50 transition-all flex items-center gap-1.5 shadow-sm"
        >
          <span className="material-symbols-outlined text-[16px]">movie_creation</span>
          <span>{mode === 'image' ? 'Animate Image with Veo' : 'Generate Video from Text'}</span>
        </button>
      </div>

      {videoBlobUrl && (
        <div className="p-4 rounded-xl bg-[#080e1d] border border-primary/30 flex flex-col gap-3 animate-fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-primary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">
                {isSampleScene ? 'preview' : 'check_circle'}
              </span>
              {isSampleScene ? 'Demonstration Atmospheric Animation Scene' : `Veo Video Generated (${aspectRatio})`}
            </span>
            <a
              href={videoBlobUrl}
              download="mythos_veo_video.mp4"
              className="text-xs text-primary hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">download</span>
              Download MP4
            </a>
          </div>
          <video controls src={videoBlobUrl} className="w-full rounded-xl bg-black max-h-[420px]" autoPlay loop playsInline />
          {isSampleScene && (
            <p className="text-[11px] text-on-surface-variant italic">
              Demonstration atmosphere scene active. When your Gemini API key has available quota, Veo 3 will render custom text and uploaded image animations.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// 4. Live Voice API Chamber (gemini-3.8-live)
// -------------------------------------------------------------
function LiveVoiceLab() {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const captureService = useRef<AudioCaptureService>(new AudioCaptureService());
  const audioPlayer = useRef<LiveAudioPlayer | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  const handleStartConversation = async () => {
    setConnecting(true);
    setError(null);

    try {
      audioPlayer.current = new LiveAudioPlayer();

      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/api/live`;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = async () => {
        setConnected(true);
        setConnecting(false);

        // Start microphone streaming
        await captureService.current.startLiveAudioStream((base64Pcm) => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ audio: base64Pcm }));
          }
        });
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.audio) {
            setSpeaking(true);
            audioPlayer.current?.playChunk(data.audio);
          }
          if (data.interrupted) {
            audioPlayer.current?.interrupt();
            setSpeaking(false);
          }
          if (data.error) {
            setError(data.error);
          }
        } catch (e) {
          console.error(e);
        }
      };

      ws.onerror = () => {
        setError('WebSocket connection to Gemini Live API failed');
        handleStopConversation();
      };

      ws.onclose = () => {
        setConnected(false);
        setConnecting(false);
        setSpeaking(false);
      };
    } catch (err: any) {
      setError(err?.message || 'Could not connect to Live API');
      setConnecting(false);
      setConnected(false);
    }
  };

  const handleStopConversation = () => {
    captureService.current.stopLiveAudioStream();
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    if (audioPlayer.current) {
      audioPlayer.current.close();
      audioPlayer.current = null;
    }
    setConnected(false);
    setConnecting(false);
    setSpeaking(false);
  };

  useEffect(() => {
    return () => {
      handleStopConversation();
    };
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h3 className="font-headline-sm text-xl text-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">audio_spark</span>
          Live Voice Chamber with Master Tobias
        </h3>
        <p className="text-xs text-on-surface-variant">
          Model: <span className="font-mono text-primary">gemini-3.8-live</span>. Experience zero-latency, two-way conversational voice with natural backchanneling and real-time interruption.
        </p>
      </div>

      <div className="p-8 rounded-2xl bg-[#080e1d] border border-primary/20 flex flex-col items-center justify-center gap-5 text-center relative overflow-hidden">
        {/* Animated aura rings when connected */}
        {connected && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-48 h-48 rounded-full bg-primary/10 animate-ping" />
            <div className="w-32 h-32 rounded-full bg-primary/20 animate-pulse" />
          </div>
        )}

        <div
          className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${
            connected
              ? speaking
                ? 'bg-primary text-[#452b00] ring-4 ring-primary-fixed shadow-2xl scale-110'
                : 'bg-primary/20 text-primary ring-2 ring-primary'
              : 'bg-[#242a3a] text-on-surface-variant'
          }`}
        >
          <span className="material-symbols-outlined text-[44px]">
            {connected ? (speaking ? 'graphic_eq' : 'mic') : 'mic_off'}
          </span>
        </div>

        <div className="flex flex-col gap-1 max-w-sm">
          <h4 className="font-headline-sm text-lg text-[#dde2f8]">
            {connected
              ? speaking
                ? 'Master Tobias is speaking...'
                : 'Listening to your voice...'
              : 'Ready to converse'}
          </h4>
          <p className="text-xs text-on-surface-variant">
            {connected
              ? 'Speak naturally about clockwork, patience, or grief. You can interrupt him at any moment.'
              : 'Click below to initiate bidirectional live audio streaming with Gemini 3.8 Live.'}
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-[#690005]/40 border border-[#ffb4ab]/40 text-[#ffdad6] text-xs max-w-md">
            {error}
          </div>
        )}

        <div className="flex items-center gap-3">
          {!connected ? (
            <button
              onClick={handleStartConversation}
              disabled={connecting}
              className="px-6 py-3 rounded-xl bg-primary text-[#452b00] text-sm font-semibold hover:bg-primary-container disabled:opacity-50 transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
            >
              {connecting ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">
                    progress_activity
                  </span>
                  <span>Connecting to Live Chamber...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">phone_in_talk</span>
                  <span>Enter Voice Chamber</span>
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleStopConversation}
              className="px-6 py-3 rounded-xl bg-[#690005] hover:bg-[#93000a] text-[#ffdad6] text-sm font-semibold transition-all flex items-center gap-2 shadow-lg"
            >
              <span className="material-symbols-outlined text-[18px]">call_end</span>
              <span>Conclude Conversation</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 5. Google Search Grounding Archive (gemini-3.5-flash with googleSearch)
// -------------------------------------------------------------
function SearchGroundingLab() {
  const [query, setQuery] = useState(
    'What is a celestial escapement in ancient horology, and how did water clocks measure time in monastic libraries?'
  );
  const [loading, setLoading] = useState(false);
  const [resultText, setResultText] = useState<string | null>(null);
  const [groundingMetadata, setGroundingMetadata] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const sampleQueries = [
    'How do pendulum clocks achieve harmonic resonance in cold climates?',
    'History of astronomical clocks in medieval cathedrals and Prague',
    'Philosophical metaphors of the clockmaker in Enlightenment literature',
  ];

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/search/grounding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Search grounding failed');
      setResultText(data.text);
      setGroundingMetadata(data.groundingMetadata);
    } catch (err: any) {
      setError(err?.message || 'Search grounding failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h3 className="font-headline-sm text-xl text-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">travel_explore</span>
          Search Grounding Historical Lore (Google Search)
        </h3>
        <p className="text-xs text-on-surface-variant">
          Model: <span className="font-mono text-primary">gemini-3.5-flash</span> with <span className="font-mono text-primary">googleSearch</span> tool. Query real-world horology, history, and folklore with live search grounding and citations.
        </p>
      </div>

      <div>
        <label className="text-xs text-on-surface-variant font-medium">Quick Curated Inquiries</label>
        <div className="flex flex-wrap gap-2 mt-1.5">
          {sampleQueries.map((q, idx) => (
            <button
              key={idx}
              onClick={() => setQuery(q)}
              className="text-xs px-3 py-1 rounded-lg bg-[#080e1d] hover:bg-[#191f2f] text-on-surface-variant hover:text-primary transition-colors border border-[#dde2f8]/5"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs text-on-surface-variant font-medium">Research Prompt with Google Search</label>
        <div className="flex gap-2 mt-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl bg-[#080e1d] border border-[#dde2f8]/10 text-xs text-[#dde2f8] focus:outline-none focus:border-primary"
          />
          <button
            onClick={handleSearch}
            disabled={loading || !query.trim()}
            className="px-5 py-2.5 rounded-xl bg-primary text-[#452b00] text-xs font-semibold hover:bg-primary-container disabled:opacity-50 transition-all flex items-center gap-1.5"
          >
            {loading ? (
              <>
                <span className="material-symbols-outlined text-[16px] animate-spin">
                  progress_activity
                </span>
                <span>Searching Web...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[16px]">search</span>
                <span>Query Grounding</span>
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-[#690005]/40 border border-[#ffb4ab]/40 text-[#ffdad6] text-xs">
          {error}
        </div>
      )}

      {resultText && (
        <div className="p-5 rounded-xl bg-[#080e1d] border border-primary/30 flex flex-col gap-3 animate-fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-primary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              Grounded Research Findings
            </span>
            <span className="text-[11px] text-on-surface-variant">Powered by Google Search Data</span>
          </div>

          <div className="text-xs font-sans text-[#dde2f8]/90 leading-relaxed whitespace-pre-wrap">
            {resultText}
          </div>

          {groundingMetadata?.webSearchQueries && (
            <div className="pt-3 border-t border-[#dde2f8]/5 flex flex-wrap items-center gap-2">
              <span className="text-[10px] text-on-surface-variant uppercase font-semibold">
                Google Search Queries Used:
              </span>
              {groundingMetadata.webSearchQueries.map((q: string, i: number) => (
                <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-[#191f2f] text-primary">
                  {q}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// 6. Spoken Word Audio Transcriber (gemini-3.5-transcribe)
// -------------------------------------------------------------
function TranscribeLab({ onInsert }: { onInsert?: (text: string) => void }) {
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transcribedText, setTranscribedText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const recorder = useRef<AudioCaptureService>(new AudioCaptureService());

  const handleStartRecord = async () => {
    setError(null);
    setTranscribedText(null);
    try {
      await recorder.current.startRecording();
      setRecording(true);
    } catch (err: any) {
      setError(err?.message || 'Could not access microphone');
    }
  };

  const handleStopAndTranscribe = async () => {
    setRecording(false);
    setLoading(true);

    try {
      const { base64, mimeType } = await recorder.current.stopRecording();
      const res = await fetch('/api/audio/transcribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ audioBase64: base64, mimeType }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Audio transcription failed');
      setTranscribedText(data.text);
    } catch (err: any) {
      setError(err?.message || 'Audio transcription failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h3 className="font-headline-sm text-xl text-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">speech_to_text</span>
          Voice Transcription Chamber
        </h3>
        <p className="text-xs text-on-surface-variant">
          Model: <span className="font-mono text-primary">gemini-3.5-transcribe</span>. Speak your story reflections, chapter dictation, or mentor notes into the microphone.
        </p>
      </div>

      <div className="p-8 rounded-2xl bg-[#080e1d] border border-primary/20 flex flex-col items-center justify-center gap-4 text-center">
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
            recording
              ? 'bg-[#93000a] text-white ring-4 ring-[#ffb4ab] animate-pulse'
              : 'bg-[#242a3a] text-primary'
          }`}
        >
          <span className="material-symbols-outlined text-[36px]">
            {recording ? 'mic' : 'mic_none'}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <h4 className="font-headline-sm text-base text-[#dde2f8]">
            {recording ? 'Listening to speech...' : 'Press to Begin Dictation'}
          </h4>
          <span className="text-xs text-on-surface-variant">
            {recording ? 'Click below when finished to transcribe' : 'Dictate prose or review thoughts'}
          </span>
        </div>

        {!recording ? (
          <button
            onClick={handleStartRecord}
            className="px-6 py-2.5 rounded-xl bg-primary text-[#452b00] text-xs font-semibold hover:bg-primary-container transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">radio_button_checked</span>
            <span>Start Recording Voice</span>
          </button>
        ) : (
          <button
            onClick={handleStopAndTranscribe}
            className="px-6 py-2.5 rounded-xl bg-[#690005] hover:bg-[#93000a] text-white text-xs font-semibold transition-all flex items-center gap-2 shadow-lg"
          >
            <span className="material-symbols-outlined text-[18px]">stop_circle</span>
            <span>Finish &amp; Transcribe Audio</span>
          </button>
        )}
      </div>

      {loading && (
        <div className="p-4 rounded-xl bg-[#080e1d] border border-primary/30 flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-[24px] animate-spin">
            progress_activity
          </span>
          <span className="text-xs text-primary font-medium">
            Transcribing audio with gemini-3.5-transcribe...
          </span>
        </div>
      )}

      {error && (
        <div className="p-3 rounded-xl bg-[#690005]/40 border border-[#ffb4ab]/40 text-[#ffdad6] text-xs">
          {error}
        </div>
      )}

      {transcribedText && (
        <div className="p-4 rounded-xl bg-[#080e1d] border border-primary/30 flex flex-col gap-3 animate-fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-primary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">check</span>
              Transcribed Text
            </span>
            {onInsert && (
              <button
                onClick={() => onInsert(transcribedText)}
                className="px-3 py-1 rounded-lg bg-primary/20 text-primary text-xs font-semibold hover:bg-primary hover:text-[#452b00] transition-colors"
              >
                Insert into Manuscript
              </button>
            )}
          </div>
          <p className="text-xs font-body-md text-[#dde2f8] leading-relaxed p-3 rounded-lg bg-[#151b2b]">
            {transcribedText}
          </p>
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// 7. Multi-Turn Gemini Socratic Chatbot (gemini-3.1-pro-preview / gemini-3.5-flash / gemini-3.1-flash-lite)
// -------------------------------------------------------------
function SocraticChatLab() {
  const [role, setRole] = useState<'mentor' | 'master_tobias' | 'elena_vance' | 'literary_scholar'>('master_tobias');
  const [model, setModel] = useState<'gemini-3.1-pro-preview' | 'gemini-3.5-flash' | 'gemini-3.1-flash-lite'>('gemini-3.5-flash');
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'model'; text: string }>>([
    {
      sender: 'model',
      text: 'Greetings, little sparrow. Welcome to the workshop. I am Master Tobias. What riddle of time, patience, or trembling hands weighs upon your heart today?',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || loading) return;

    const userText = inputMessage.trim();
    setInputMessage('');

    const newMessages = [...messages, { sender: 'user' as const, text: userText }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          role,
          model,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send message');

      setMessages((prev) => [...prev, { sender: 'model', text: data.text }]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        { sender: 'model', text: `Forgive me, the gears encountered a hiccup: ${err?.message}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 h-[560px]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-[#dde2f8]/5">
        <div className="flex flex-col">
          <h3 className="font-headline-sm text-lg text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">voice_chat</span>
            Socratic Dialogue Chamber
          </h3>
          <span className="text-[11px] text-on-surface-variant">
            Multi-turn conversation with character system instructions and dynamic model selection.
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Role selector */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as any)}
            className="px-2.5 py-1 rounded-lg bg-[#080e1d] border border-[#dde2f8]/10 text-xs text-[#dde2f8] focus:outline-none focus:border-primary"
          >
            <option value="master_tobias">Persona: Master Tobias</option>
            <option value="elena_vance">Persona: Elena Vance (Author)</option>
            <option value="mentor">Persona: Socratic Mentor</option>
            <option value="literary_scholar">Persona: Literary Scholar</option>
          </select>

          {/* Model selector */}
          <select
            value={model}
            onChange={(e) => setModel(e.target.value as any)}
            className="px-2.5 py-1 rounded-lg bg-[#080e1d] border border-[#dde2f8]/10 text-xs text-primary font-mono focus:outline-none focus:border-primary"
          >
            <option value="gemini-3.1-pro-preview">gemini-3.1-pro-preview (Complex)</option>
            <option value="gemini-3.5-flash">gemini-3.5-flash (General)</option>
            <option value="gemini-3.1-flash-lite">gemini-3.1-flash-lite (Fast)</option>
          </select>
        </div>
      </div>

      {/* Messages Thread */}
      <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-3">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col max-w-[85%] ${
              m.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
            }`}
          >
            <span className="text-[10px] text-on-surface-variant/70 mb-0.5 px-1">
              {m.sender === 'user' ? 'You' : role === 'master_tobias' ? 'Master Tobias' : 'Story Mentor'}
            </span>
            <div
              className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-primary text-[#452b00] rounded-br-sm font-medium'
                  : 'bg-[#080e1d] border border-[#dde2f8]/10 text-[#dde2f8] rounded-bl-sm font-sans'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="self-start flex items-center gap-2 p-3 rounded-2xl bg-[#080e1d] text-primary text-xs">
            <span className="material-symbols-outlined text-[16px] animate-spin">
              progress_activity
            </span>
            <span>Contemplating response...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <form onSubmit={handleSend} className="flex gap-2 pt-2 border-t border-[#dde2f8]/5">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder={`Speak with ${role.replace('_', ' ')}...`}
          className="flex-1 px-4 py-2.5 rounded-xl bg-[#080e1d] border border-[#dde2f8]/10 text-xs text-[#dde2f8] focus:outline-none focus:border-primary"
        />
        <button
          type="submit"
          disabled={loading || !inputMessage.trim()}
          className="px-4 py-2.5 rounded-xl bg-primary text-[#452b00] text-xs font-semibold hover:bg-primary-container disabled:opacity-50 transition-all flex items-center gap-1"
        >
          <span>Send</span>
          <span className="material-symbols-outlined text-[16px]">send</span>
        </button>
      </form>
    </div>
  );
}
