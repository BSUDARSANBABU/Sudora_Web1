import React, { useState } from 'react';
import { PageView, BlogPost } from '../../types';
import { useApp } from '../../context/AppContext';

interface AdminBlogViewProps {
  onNavigate: (view: PageView) => void;
}

export const AdminBlogView: React.FC<AdminBlogViewProps> = ({ onNavigate }) => {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('Engineering');
  const [formAuthor, setFormAuthor] = useState('Alex Morgan');
  const [formDate, setFormDate] = useState('Oct 24, 2024');
  const [formExcerpt, setFormExcerpt] = useState('');
  const [formImage, setFormImage] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleOpenCreate = () => {
    setFormTitle('');
    setFormCategory('Engineering');
    setFormAuthor('Alex Morgan');
    setFormDate(new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
    setFormExcerpt('');
    setFormImage('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80');
    setIsCreateModalOpen(true);
  };

  const handleOpenEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormTitle(post.title);
    setFormCategory(post.category);
    setFormAuthor(post.author);
    setFormDate(post.date);
    setFormExcerpt(post.excerpt);
    setFormImage(post.image);
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingPost) {
      updateBlogPost(editingPost.id, {
        title: formTitle,
        category: formCategory,
        author: formAuthor,
        date: formDate,
        excerpt: formExcerpt,
        image: formImage
      });
      showToast(`Article "${formTitle}" updated! Public /blog refreshed.`);
      setEditingPost(null);
    } else {
      const newId = 'blog-' + Date.now().toString().slice(-6);
      addBlogPost({
        id: newId,
        title: formTitle,
        category: formCategory,
        author: formAuthor,
        date: formDate,
        excerpt: formExcerpt,
        image: formImage
      });
      showToast(`Article "${formTitle}" published to public /blog!`);
      setIsCreateModalOpen(false);
    }
  };

  const handleDeletePost = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete post "${title}" from the public blog?`)) {
      deleteBlogPost(id);
      showToast(`Article "${title}" removed from public blog.`);
    }
  };

  const filteredPosts = blogPosts.filter((p) => {
    if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.author.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      {toast && (
        <div className="fixed top-20 right-6 z-50 bg-primary text-on-primary px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in duration-300">
          <span className="material-symbols-outlined text-green-300">check_circle</span>
          <p className="text-body-sm font-semibold">{toast}</p>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-headline-lg font-headline-lg text-on-surface">Manage Blog &amp; Insights CMS</h2>
            <span className="text-label-sm font-bold bg-primary-fixed text-on-primary-fixed px-2.5 py-0.5 rounded-full">
              Public Page Manager
            </span>
          </div>
          <p className="text-body-md text-on-surface-variant mt-1">
            Write, curate, and publish industry articles and engineering insights on <code>/blog</code>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('blog')}
            className="px-4 py-2 border border-outline-variant rounded-lg text-label-md font-semibold text-on-surface hover:bg-surface-variant transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">visibility</span>
            View Public Blog
          </button>
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 bg-primary text-on-primary rounded-lg text-label-md font-semibold hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Write Article
          </button>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-xs">
          <span className="text-label-sm text-on-surface-variant uppercase font-bold tracking-wider">Published Articles</span>
          <p className="text-headline-md font-bold text-primary mt-1">{blogPosts.length}</p>
          <span className="text-label-sm text-emerald-600 font-semibold">Live in public reader</span>
        </div>
        <div className="p-5 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-xs">
          <span className="text-label-sm text-on-surface-variant uppercase font-bold tracking-wider">Average Monthly Views</span>
          <p className="text-headline-md font-bold text-on-surface mt-1">42.5k</p>
          <span className="text-label-sm text-outline">+24% reader engagement</span>
        </div>
        <div className="p-5 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-xs">
          <span className="text-label-sm text-on-surface-variant uppercase font-bold tracking-wider">Public Target View</span>
          <p className="text-headline-md font-bold text-secondary mt-1">/blog</p>
          <span className="text-label-sm text-primary font-semibold">Instant CMS Synchronization</span>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant">
        <div className="relative flex-1 w-full max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-sm">search</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search articles by title, author or keywords..."
            className="w-full bg-surface-container-low border border-outline-variant rounded-lg pl-9 pr-4 py-2 text-body-sm text-on-surface focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex items-center gap-2">
          {['All', 'Engineering', 'Architecture', 'AI', 'Cloud'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-label-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === cat ? 'bg-primary text-on-primary' : 'bg-surface-container-low text-on-surface hover:bg-surface-variant'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="h-44 w-full relative overflow-hidden bg-surface-container-high">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-inverse-surface/80 text-inverse-on-surface text-label-sm font-bold px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                  {post.category}
                </span>
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-surface-container-lowest/90 rounded-lg p-1 shadow-sm">
                  <button
                    onClick={() => handleOpenEdit(post)}
                    className="p-1 hover:bg-surface-variant rounded text-on-surface cursor-pointer"
                    title="Edit"
                  >
                    <span className="material-symbols-outlined text-base">edit</span>
                  </button>
                  <button
                    onClick={() => handleDeletePost(post.id, post.title)}
                    className="p-1 hover:bg-error-container/30 rounded text-error cursor-pointer"
                    title="Delete"
                  >
                    <span className="material-symbols-outlined text-base">delete</span>
                  </button>
                </div>
              </div>

              <div className="p-5 space-y-2.5">
                <div className="flex items-center justify-between text-label-sm text-outline">
                  <span>By <strong className="text-on-surface">{post.author}</strong></span>
                  <span>{post.date}</span>
                </div>

                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface line-clamp-2">{post.title}</h3>
                <p className="text-body-sm text-on-surface-variant line-clamp-3">{post.excerpt}</p>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={() => handleOpenEdit(post)}
                className="w-full py-2 bg-surface-container-high hover:bg-surface-variant text-on-surface rounded-lg text-label-sm font-bold transition-colors cursor-pointer"
              >
                Edit Article
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {(isCreateModalOpen || editingPost) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-surface-container-lowest rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-outline-variant shadow-2xl relative">
            <button
              onClick={() => {
                setIsCreateModalOpen(false);
                setEditingPost(null);
              }}
              className="absolute top-5 right-5 text-on-surface-variant hover:text-on-surface p-1 rounded-full cursor-pointer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <h3 className="text-headline-md font-bold text-on-surface mb-1">
              {editingPost ? 'Edit Blog Article' : 'Publish New Blog Article'}
            </h3>
            <p className="text-body-sm text-on-surface-variant mb-6">
              Articles are immediately available to reader audiences at <code>/blog</code>.
            </p>

            <form onSubmit={handleSavePost} className="space-y-4">
              <div>
                <label className="block text-label-md font-semibold text-on-surface mb-1">Article Title *</label>
                <input
                  required
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Scaling Distributed Microservices with Zero-Trust Security"
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-label-md font-semibold text-on-surface mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary"
                  >
                    <option>Engineering</option>
                    <option>Architecture</option>
                    <option>AI</option>
                    <option>Cloud</option>
                    <option>Security</option>
                  </select>
                </div>
                <div>
                  <label className="block text-label-md font-semibold text-on-surface mb-1">Author Name</label>
                  <input
                    type="text"
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                    placeholder="Alex Morgan"
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-label-md font-semibold text-on-surface mb-1">Cover Image URL</label>
                <input
                  type="url"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-label-md font-semibold text-on-surface mb-1">Article Summary &amp; Excerpt *</label>
                <textarea
                  required
                  rows={4}
                  value={formExcerpt}
                  onChange={(e) => setFormExcerpt(e.target.value)}
                  placeholder="A compelling executive summary that hooks readers..."
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2.5 text-body-md text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-outline-variant">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setEditingPost(null);
                  }}
                  className="px-4 py-2 border border-outline-variant rounded-lg text-label-md font-medium text-on-surface hover:bg-surface-variant cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary text-on-primary rounded-lg text-label-md font-bold hover:bg-primary/90 shadow-sm cursor-pointer"
                >
                  {editingPost ? 'Save Article' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
