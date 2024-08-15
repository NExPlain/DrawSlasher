import React, { useState, useEffect, useCallback } from 'react';

export interface Movie {
  id: number;
  title: string;
  year: number;
  posterUrl: string;
}

export interface SelectedMovie extends Movie {
  reference: string;
}

interface MoviePickerProps {
  onChange: (selectedMovies: SelectedMovie[]) => void;
  onStringChange: (movieString: string) => void;
  theme: 'light' | 'dark';
}

const movieData: Movie[] = [
  { id: 1, title: '肖申克的救赎', year: 1994, posterUrl: 'https://via.placeholder.com/150x225.png?text=Shawshank' },
  { id: 2, title: '教父', year: 1972, posterUrl: 'https://via.placeholder.com/150x225.png?text=Godfather' },
  { id: 3, title: '蝙蝠侠：黑暗骑士', year: 2008, posterUrl: 'https://via.placeholder.com/150x225.png?text=Dark+Knight' },
  { id: 4, title: '十二怒汉', year: 1957, posterUrl: 'https://via.placeholder.com/150x225.png?text=12+Angry+Men' },
  { id: 5, title: '辛德勒的名单', year: 1993, posterUrl: 'https://via.placeholder.com/150x225.png?text=Schindler\'s+List' },
  { id: 6, title: '指环王3：王者归来', year: 2003, posterUrl: 'https://via.placeholder.com/150x225.png?text=LOTR' },
  { id: 7, title: '低俗小说', year: 1994, posterUrl: 'https://via.placeholder.com/150x225.png?text=Pulp+Fiction' },
  { id: 8, title: '黄金三镖客', year: 1966, posterUrl: 'https://via.placeholder.com/150x225.png?text=Good+Bad+Ugly' },
  { id: 9, title: '搏击俱乐部', year: 1999, posterUrl: 'https://via.placeholder.com/150x225.png?text=Fight+Club' },
  { id: 10, title: '阿甘正传', year: 1994, posterUrl: 'https://via.placeholder.com/150x225.png?text=Forrest+Gump' }
];

export const MoviePicker: React.FC<MoviePickerProps> = ({ onChange, onStringChange, theme }) => {
  const [selectedMovies, setSelectedMovies] = useState<SelectedMovie[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);
  const [saving, setSaving] = useState(false);

  // 主题相关的颜色
  const colors = {
    background: theme === 'light' ? '#ffffff' : '#1a1a1a',
    text: theme === 'light' ? '#333333' : '#ffffff',
    border: theme === 'light' ? '#dddddd' : '#444444',
    highlight: theme === 'light' ? '#4CAF50' : '#45a049',
    input: theme === 'light' ? '#ffffff' : '#2a2a2a',
    selectedBackground: theme === 'light' ? '#E8F5E9' : '#2a3f2b',
  };

  useEffect(() => {
    const movieString = selectedMovies
      .map(movie => `${movie.title} (${movie.year})${movie.reference ? ': ' + movie.reference : ''}`)
      .join('; ');
    onStringChange(movieString);
  }, [selectedMovies, onStringChange]);

  const handleSelectMovie = useCallback((movie: Movie) => {
    setSelectedMovies(prev => {
      const isSelected = prev.some(m => m.id === movie.id);
      if (isSelected) {
        return prev.filter(m => m.id !== movie.id);
      } else {
        return [...prev, { ...movie, reference: '' }];
      }
    });
  }, []);

  const handleReferenceChange = useCallback((id: number, reference: string) => {
    setSelectedMovies(prev => 
      prev.map(movie => movie.id === id ? { ...movie, reference } : movie)
    );
  }, []);

  const handleSave = useCallback(() => {
    setSaving(true);
    setTimeout(() => {
      onChange(selectedMovies);
      setSaving(false);
      setEditingId(null);
    }, 0);
  }, [selectedMovies, onChange]);

  const getSelectionSummary = (movies: SelectedMovie[]): string => {
    if (movies.length === 0) return '未选择电影';
    if (movies.length === 1) return `已参考：${movies[0].title}`;
    if (movies.length === 2) return `已参考：${movies[0].title} 和 ${movies[1].title}`;
    return `已参考：${movies[0].title}、${movies[1].title} 等 ${movies.length} 部电影`;
  };

  const filteredMovies = movieData.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.year.toString().includes(searchTerm)
  );

  const sortedMovies = [
    ...selectedMovies,
    ...filteredMovies.filter(movie => !selectedMovies.some(m => m.id === movie.id))
  ];

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      width: '95%',
      maxWidth: '1200px',
      margin: '30px auto',
      padding: '30px', 
      border: `1px solid ${colors.border}`, 
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      background: colors.background,
      color: colors.text
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        cursor: 'pointer'
      }} onClick={() => setIsExpanded(!isExpanded)}>
        <div style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: 'calc(100% - 30px)'
        }}>
          {getSelectionSummary(selectedMovies)}
        </div>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>

      {isExpanded && (
        <>
          <input
            type="text"
            placeholder="搜索电影..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '20px',
              fontSize: '16px',
              borderRadius: '4px',
              border: `1px solid ${colors.border}`,
              background: colors.input,
              color: colors.text
            }}
          />
          <div style={{
            display: 'flex',
            flexWrap: 'nowrap',
            overflowX: 'auto',
            gap: '20px',
            padding: '20px 0',
            minHeight: '300px'
          }}>
            {sortedMovies.map(movie => {
              const isSelected = selectedMovies.some(m => m.id === movie.id);
              const selectedMovie = selectedMovies.find(m => m.id === movie.id);
              return (
                <div key={movie.id} style={{
                  flexShrink: 0,
                  width: '180px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                  <div 
                    style={{
                      width: '150px',
                      height: '225px',
                      border: isSelected ? `3px solid ${colors.highlight}` : `1px solid ${colors.border}`,
                      borderRadius: '4px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onClick={() => handleSelectMovie(movie)}
                  >
                    <img
                      src={movie.posterUrl}
                      alt={movie.title}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                  <div style={{ 
                    width: '100%',
                    padding: '5px',
                    fontSize: '14px',
                    textAlign: 'center',
                    marginTop: '5px'
                  }}>
                    {movie.title} ({movie.year})
                  </div>
                  {isSelected && (
                    <div style={{ width: '100%', marginTop: '10px' }}>
                      {editingId === movie.id ? (
                        <textarea
                          value={selectedMovie?.reference || ''}
                          onChange={(e) => handleReferenceChange(movie.id, e.target.value)}
                          onBlur={handleSave}
                          autoFocus
                          placeholder="描述如何参考这部电影..."
                          style={{
                            width: '100%',
                            minHeight: '80px',
                            padding: '8px',
                            fontSize: '14px',
                            border: `2px solid ${colors.highlight}`,
                            borderRadius: '4px',
                            resize: 'vertical',
                            outline: 'none',
                            background: colors.input,
                            color: colors.text
                          }}
                        />
                      ) : (
                        <div
                          onClick={() => setEditingId(movie.id)}
                          style={{
                            width: '100%',
                            minHeight: '40px',
                            padding: '8px',
                            fontSize: '14px',
                            border: `2px solid ${colors.highlight}`,
                            borderRadius: '4px',
                            cursor: 'pointer',
                            background: selectedMovie?.reference ? colors.selectedBackground : colors.input,
                            color: colors.text,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {selectedMovie?.reference || '+ 添加参考方式'}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
      {saving && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: colors.highlight,
          color: '#ffffff',
          padding: '10px 20px',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}>
          保存中...
        </div>
      )}
    </div>
  );
};

export default MoviePicker;