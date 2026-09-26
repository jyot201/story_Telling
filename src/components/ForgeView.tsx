import React, { useState } from 'react';
import { Story } from '../types';

interface ForgeViewProps {
  onPublishStory: (newStory: Story) => void;
  onOpenAiTab?: (tab: 'music' | 'image' | 'video' | 'live' | 'search' | 'transcribe' | 'chat') => void;
}

export const ForgeView: React.FC<ForgeViewProps> = ({ onPublishStory, onOpenAiTab }) => {
  const [title, setTitle] = useState('The Glassblower of Sunken Lanterns');
  const [author, setAuthor] = useState('Elowen Miller');
  const [category, setCategory] = useState('Patience & Wonder');
  const [ageGroup, setAgeGroup] = useState('Ages 8–12');
  const [sceneBadge, setSceneBadge] = useState('The Furnace by the Low Tide');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80');
  const [moralThesis, setMoralThesis] = useState(
    'A parable on emotional cooling. Glass that is cooled with frantic breath shatters at the first cold touch; glass annealed slowly in deep embers survives the deepest sea.'
  );
  const [authorNote, setAuthorNote] = useState(
    '“Written for impatient children who rush their creations and fear slow contemplation.”'
  );
  const [chapterTitle, setChapterTitle] = useState('The Breath in the Iron Blowpipe');
  const [paragraphsText, setParagraphsText] = useState(
    `The workshop of Master Corin faced the salt marsh, where the tide came in twice daily to hiss against the stone foundation. Inside, the glowing crucible bathed the rafters in dragon-amber light.\n\nClara’s brother Rowan watched the honey-thick globule of molten quartz turn on the rod. Rowan wanted to dip the glass into the cold brine immediately to see it freeze into crystal.\n\n“If you cool it now, boy, you leave all the fear trapped inside,” Master Corin murmured without pausing the rotation. “True strength is not rushing the cold. It is letting the heat say its full farewell.”`
  );
  const [pullQuote, setPullQuote] = useState('True strength is not rushing the cold. It is letting the heat say its full farewell.');
  const [sparkQuestion, setSparkQuestion] = useState('Why does patience make a fragile material like glass capable of withstanding the ocean?');

  const [activeSubTab, setActiveSubTab] = useState<'editor' | 'preview'>('editor');

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();

    const paragraphs = paragraphsText
      .split('\n\n')
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    const newStory: Story = {
      id: `forge-${Date.now()}`,
      title,
      author,
      category,
      ageGroup,
      readTime: '6 min read',
      coverImage,
      sceneBadge,
      actBadge: 'Act I Scene',
      summary: moralThesis.slice(0, 140) + '...',
      codex: {
        moralThesis,
        authorNote,
        discussionSparks: [
          {
            id: `spark-${Date.now()}`,
            question: sparkQuestion,
            context: 'Reflect upon the annealing process described by Master Corin.'
          }
        ]
      },
      chapters: [
        {
          id: 1,
          numberRoman: 'I',
          title: chapterTitle,
          paragraphs: paragraphs.length > 0 ? paragraphs : ['The fire burned quietly through the night...'],
          pullQuote: pullQuote
            ? {
                id: `quote-${Date.now()}`,
                quote: `${pullQuote}`,
                attribution: `${author} · Chapter I`,
                verse: 'Verse 12'
              }
            : undefined
        }
      ]
    };

    onPublishStory(newStory);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-app text-app pb-24 transition-colors duration-500">
      <div className="max-w-4xl mx-auto w-full px-margin-mobile pt-6 pb-6">
        {/* Atelier Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-app">
          <div className="flex flex-col gap-1.5">
            <span className="text-primary font-label-sm uppercase tracking-wider flex items-center gap-1.5 font-semibold">
              <span className="material-symbols-outlined text-[16px]">history_edu</span>
              The Storyteller’s Atelier
            </span>
            <h1 className="font-headline-lg text-2xl md:text-3xl text-app">
              The Mythos Forge
            </h1>
            <p className="font-body-sm text-app-muted max-w-xl">
              Inscribe your own moral parables and philosophical codices. Once forged, your tale enters the reader library with illuminated formatting and voice narration.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-app-container p-1 rounded-xl border border-app transition-colors">
            <button
              onClick={() => setActiveSubTab('editor')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeSubTab === 'editor'
                  ? 'bg-primary text-on-primary font-semibold shadow-xs'
                  : 'text-app-muted hover:text-app'
              }`}
            >
              Compose &amp; Sculpt
            </button>
            <button
              onClick={() => setActiveSubTab('preview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeSubTab === 'preview'
                  ? 'bg-primary text-on-primary font-semibold shadow-xs'
                  : 'text-app-muted hover:text-app'
              }`}
            >
              Illuminated Preview
            </button>
          </div>
        </div>

        {/* Sub-tab 1: Editor Form */}
        {activeSubTab === 'editor' ? (
          <form onSubmit={handlePublish} className="flex flex-col gap-6 mt-6">
            {/* Metadata Section */}
            <div className="p-6 rounded-2xl bg-app-surface border border-app flex flex-col gap-4 shadow-sm transition-colors">
              <h3 className="font-headline-sm text-lg text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">auto_stories</span>
                Story Foundations &amp; Classification
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-app-muted font-medium">Story Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full mt-1 px-3.5 py-2.5 rounded-xl bg-app-container border border-app text-sm text-app focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-xs text-app-muted font-medium">Author / Storyteller</label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full mt-1 px-3.5 py-2.5 rounded-xl bg-app-container border border-app text-sm text-app focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-app-muted font-medium">Moral Motif</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full mt-1 px-3.5 py-2.5 rounded-xl bg-app-container border border-app text-xs text-app focus:outline-none focus:border-primary"
                  >
                    <option value="Moral Growth">Moral Growth</option>
                    <option value="Patience & Wonder">Patience &amp; Wonder</option>
                    <option value="Humility & Wonder">Humility &amp; Wonder</option>
                    <option value="Empathy & Courage">Empathy &amp; Courage</option>
                    <option value="Acceptance & Grace">Acceptance &amp; Grace</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-app-muted font-medium">Target Readers</label>
                  <select
                    value={ageGroup}
                    onChange={(e) => setAgeGroup(e.target.value)}
                    className="w-full mt-1 px-3.5 py-2.5 rounded-xl bg-app-container border border-app text-xs text-app focus:outline-none focus:border-primary"
                  >
                    <option value="Ages 6–9">Ages 6–9</option>
                    <option value="Ages 8–12">Ages 8–12</option>
                    <option value="Ages 10–14">Ages 10–14</option>
                    <option value="Young Adult">Young Adult</option>
                    <option value="All Ages">All Ages</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-app-muted font-medium">Scene Atmosphere Setting</label>
                  <input
                    type="text"
                    value={sceneBadge}
                    onChange={(e) => setSceneBadge(e.target.value)}
                    placeholder="e.g. The Mill by the Frozen Creek"
                    className="w-full mt-1 px-3.5 py-2.5 rounded-xl bg-app-container border border-app text-xs text-app focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Philosophical Codex Foundations */}
            <div className="p-6 rounded-2xl bg-app-surface border border-app flex flex-col gap-4 shadow-sm transition-colors">
              <h3 className="font-headline-sm text-lg text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">psychology_alt</span>
                Philosophical Codex &amp; Core Moral Thesis
              </h3>

              <div>
                <label className="text-xs text-app-muted font-medium">
                  The Core Need &amp; Moral Thesis (Pedagogical Rationale)
                </label>
                <textarea
                  rows={2}
                  required
                  value={moralThesis}
                  onChange={(e) => setMoralThesis(e.target.value)}
                  className="w-full mt-1 p-3 rounded-xl bg-app-container border border-app text-xs text-app focus:outline-none focus:border-primary leading-relaxed"
                />
              </div>

              <div>
                <label className="text-xs text-app-muted font-medium">Author’s Guiding Note for Mentors</label>
                <textarea
                  rows={2}
                  value={authorNote}
                  onChange={(e) => setAuthorNote(e.target.value)}
                  className="w-full mt-1 p-3 rounded-xl bg-app-container border border-app text-xs text-app focus:outline-none focus:border-primary leading-relaxed"
                />
              </div>

              <div>
                <label className="text-xs text-app-muted font-medium">Discussion Spark Question</label>
                <input
                  type="text"
                  value={sparkQuestion}
                  onChange={(e) => setSparkQuestion(e.target.value)}
                  className="w-full mt-1 px-3.5 py-2.5 rounded-xl bg-app-container border border-app text-xs text-app focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Chapter I Prose */}
            <div className="p-6 rounded-2xl bg-app-surface border border-app flex flex-col gap-4 shadow-sm transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-headline-sm text-lg text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">feather</span>
                  Chapter I Manuscript Prose
                </h3>
                {onOpenAiTab && (
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => onOpenAiTab('transcribe')}
                      className="px-2.5 py-1 rounded-lg bg-primary/15 hover:bg-primary/25 text-primary border border-primary/30 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px]">mic</span>
                      <span>Dictate with Gemini Transcribe</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenAiTab('image')}
                      className="px-2.5 py-1 rounded-lg bg-primary/15 hover:bg-primary/25 text-primary border border-primary/30 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px]">brush</span>
                      <span>Generate Cover Art</span>
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs text-app-muted font-medium">Chapter Title</label>
                <input
                  type="text"
                  required
                  value={chapterTitle}
                  onChange={(e) => setChapterTitle(e.target.value)}
                  className="w-full mt-1 px-3.5 py-2.5 rounded-xl bg-app-container border border-app text-sm text-app focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-xs text-app-muted font-medium">Manuscript Text</label>
                <textarea
                  rows={6}
                  required
                  value={paragraphsText}
                  onChange={(e) => setParagraphsText(e.target.value)}
                  className="w-full mt-1 p-4 rounded-xl bg-app-container border border-app text-sm font-sans text-app focus:outline-none focus:border-primary leading-relaxed"
                />
              </div>

              <div>
                <label className="text-xs text-app-muted font-medium">Saved Reflection Pull-Quote</label>
                <input
                  type="text"
                  value={pullQuote}
                  onChange={(e) => setPullQuote(e.target.value)}
                  placeholder="A memorable epigraph or philosophical lesson..."
                  className="w-full mt-1 px-3.5 py-2.5 rounded-xl bg-app-container border border-app text-xs text-primary focus:outline-none focus:border-primary italic"
                />
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveSubTab('preview')}
                className="px-5 py-2.5 rounded-xl bg-app-surface border border-app hover:border-primary/40 text-xs text-app transition-all cursor-pointer"
              >
                Inspect Preview
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-primary text-on-primary text-sm font-semibold hover:bg-primary-container transition-all flex items-center gap-1.5 shadow-lg shadow-primary/10 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">publish</span>
                <span>Inscribe &amp; Enter Reader</span>
              </button>
            </div>
          </form>
        ) : (
          /* Sub-tab 2: Illuminated Live Preview */
          <div className="flex flex-col gap-6 mt-6 max-w-[720px] mx-auto">
            <div className="p-6 rounded-2xl bg-app-surface border border-primary/20 flex flex-col gap-4 transition-colors">
              <div className="flex items-center justify-between text-xs text-primary">
                <span className="font-semibold tracking-wider">PREVIEW MODE</span>
                <button
                  onClick={() => setActiveSubTab('editor')}
                  className="underline hover:text-primary font-medium cursor-pointer"
                >
                  Return to editing
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-app-high text-primary text-xs font-semibold border border-app-subtle">
                  {category}
                </span>
                <span className="text-xs text-app-muted">{ageGroup}</span>
                <span className="text-xs text-app-muted ml-auto flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">schedule</span>
                  6 min read
                </span>
              </div>

              <h1 className="font-headline-lg-mobile text-3xl text-app">
                {title || 'Untitled Tale'}
              </h1>
              <span className="font-title-md text-primary">By {author || 'Unknown'}</span>

              <div className="p-3 rounded-lg bg-app-container text-xs text-app-muted">
                <span className="font-bold text-primary">Core Thesis: </span>
                {moralThesis}
              </div>

              {pullQuote && (
                <div className="my-2 p-4 rounded-xl bg-app-container border-l-2 border-primary">
                  <blockquote className="font-headline-sm text-base text-primary italic">
                    “{pullQuote}”
                  </blockquote>
                </div>
              )}

              <div className="flex flex-col gap-3 font-body-lg text-sm text-app leading-relaxed pt-2">
                {paragraphsText.split('\n\n').map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <button
                onClick={handlePublish}
                className="mt-4 py-2.5 rounded-xl bg-primary text-on-primary text-sm font-semibold hover:bg-primary-container transition-all flex items-center justify-center gap-1 cursor-pointer shadow-sm"
              >
                <span>Publish to Reader Now</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
