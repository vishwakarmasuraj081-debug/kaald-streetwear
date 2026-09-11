import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../data/products';
import { JOURNAL_ARTICLES } from '../data/journal';
import { Product, JournalArticle } from '../types';
import { Search, X, ArrowUpRight, Sparkles, Clock } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onSelectArticle: (article: JournalArticle) => void;
}

const POPULAR_SEARCHES = [
  '480 GSM HOODIE',
  'CARGO PANTS',
  'GRAPHIC T-SHIRT',
  'DROP 01',
  'OVERSIZED FIT',
  'SNEAKERS',
];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onSelectArticle,
}) => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'HEAVYWEIGHT TERRY',
    'MOTION HOODIE',
    'URBAN CARGO',
  ]);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { products: [], articles: [] };

    const matchedProducts = PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.tag?.toLowerCase().includes(q) ||
        (p.gsm && `${p.gsm}`.includes(q))
    );

    const matchedArticles = JOURNAL_ARTICLES.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.subtitle.toLowerCase().includes(q)
    );

    return { products: matchedProducts, articles: matchedArticles };
  }, [query]);

  if (!isOpen) return null;

  const handleSelectTerm = (term: string) => {
    setQuery(term);
    if (!recentSearches.includes(term)) {
      setRecentSearches([term, ...recentSearches.slice(0, 4)]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#070707]/95 backdrop-blur-2xl flex flex-col justify-start p-6 sm:p-12 overflow-y-auto animate-fade-in">
      <div className="max-w-4xl w-full mx-auto">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-[#222]">
          <span className="text-[10px] font-mono-tech tracking-[0.3em] text-[#7A7A74] uppercase">
            ARCHIVE SEARCH INTERFACE
          </span>
          <button
            onClick={onClose}
            className="p-2 text-[#888] hover:text-white hover:bg-[#1A1A1A] transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Field */}
        <div className="py-8 flex items-center gap-4 border-b border-[#2E2E2E]">
          <Search className="w-6 h-6 text-[#777]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SEARCH PRODUCTS, FABRICS, ARTICLES (E.G. '480 GSM', 'CARGO')..."
            className="w-full bg-transparent text-xl sm:text-3xl font-display font-bold text-[#F4F4F1] placeholder-[#444] focus:outline-none uppercase"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs font-mono-tech text-[#888] hover:text-white"
            >
              CLEAR
            </button>
          )}
        </div>

        {/* Dynamic State: If No Query, show Popular & Recent */}
        {!query.trim() ? (
          <div className="py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Recent Searches */}
            <div>
              <span className="text-xs font-mono-tech tracking-wider text-[#777] uppercase flex items-center gap-2 mb-4">
                <Clock className="w-3.5 h-3.5" />
                RECENT DISPATCH SEARCHES
              </span>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => handleSelectTerm(term)}
                    className="px-3 py-1.5 bg-[#121212] border border-[#242424] text-xs font-mono-tech text-[#BBB] hover:text-white hover:border-[#444] transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Searches */}
            <div>
              <span className="text-xs font-mono-tech tracking-wider text-[#777] uppercase flex items-center gap-2 mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                POPULAR TOPICS
              </span>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((term) => (
                  <button
                    key={term}
                    onClick={() => handleSelectTerm(term)}
                    className="px-3 py-1.5 bg-[#121212] border border-[#242424] text-xs font-mono-tech text-[#BBB] hover:text-white hover:border-[#444] transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Search Results */
          <div className="py-8 space-y-10">
            {/* Products Found */}
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#1C1C1C] mb-6">
                <span className="text-xs font-mono-tech tracking-widest text-[#888] uppercase">
                  MATCHING GARMENTS ({searchResults.products.length})
                </span>
              </div>

              {searchResults.products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {searchResults.products.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => {
                        onSelectProduct(prod);
                        onClose();
                      }}
                      className="group cursor-pointer bg-[#101010] border border-[#202020] hover:border-[#444] p-3 flex gap-3 transition-all"
                    >
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="w-16 h-20 object-cover bg-[#181818]"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex flex-col justify-between flex-1">
                        <div>
                          <span className="text-[9px] font-mono-tech text-[#777] uppercase block">
                            {prod.category} {prod.gsm ? `// ${prod.gsm} GSM` : ''}
                          </span>
                          <h4 className="font-display font-bold text-xs sm:text-sm text-[#F4F4F1] group-hover:text-white line-clamp-1 mt-0.5">
                            {prod.name}
                          </h4>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-mono-tech text-xs font-bold text-[#F4F4F1]">
                            ₹{prod.price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[10px] font-mono-tech text-[#777] uppercase group-hover:text-white flex items-center">
                            VIEW <ArrowUpRight className="w-3 h-3 ml-0.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs font-mono-tech text-[#666] uppercase">
                  NO PRODUCTS MATCHED "{query.toUpperCase()}".
                </p>
              )}
            </div>

            {/* Articles Found */}
            {searchResults.articles.length > 0 && (
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#1C1C1C] mb-4">
                  <span className="text-xs font-mono-tech tracking-widest text-[#888] uppercase">
                    MATCHING ESSAYS & STORIES ({searchResults.articles.length})
                  </span>
                </div>
                <div className="space-y-3">
                  {searchResults.articles.map((art) => (
                    <div
                      key={art.id}
                      onClick={() => {
                        onSelectArticle(art);
                        onClose();
                      }}
                      className="group cursor-pointer bg-[#101010] border border-[#202020] hover:border-[#444] p-4 flex items-center justify-between transition-all"
                    >
                      <div>
                        <span className="text-[10px] font-mono-tech text-[#777] uppercase block">
                          JOURNAL // {art.category} • {art.readTime}
                        </span>
                        <h4 className="font-display font-bold text-base text-[#F4F4F1] group-hover:text-white mt-1">
                          {art.title}
                        </h4>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-[#888] group-hover:text-white transition-colors" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
