// FilterBar.jsx
import React, { useState, useEffect, useRef } from 'react';
import "./FilterBar.css";
import { useEvents } from '../../Context/EventsContext';

const FilterBar = () => {
    console.log('🔄 FilterBar renderizado');
    const {
        filters,
        updateFilters,
        genres,
        cities,
        handleSearch,
        resetAllFilters,
        searchQuery,
    } = useEvents();

    const [isOpen, setIsOpen] = useState(false);
    const [activeFiltersCount, setActiveFiltersCount] = useState(0);
    const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery || '');
    const filterRef = useRef(null);

    // Calcular filtros activos
    useEffect(() => {
        let count = 0;
        if (filters.genre) count++;
        if (filters.location) count++;
        if (filters.dateFrom) count++;
        if (filters.dateTo) count++;
        if (searchQuery) count++;
        setActiveFiltersCount(count);
    }, [filters, searchQuery]);

    // Click fuera para cerrar
    useEffect(() => {
        if (isOpen) {
            const handleOutsideClick = (event) => {
                if (filterRef.current && !filterRef.current.contains(event.target)) {
                    setIsOpen(false);
                }
            };
            
            document.addEventListener('mousedown', handleOutsideClick);
            return () => {
                document.removeEventListener('mousedown', handleOutsideClick);
            };
        }
    }, [isOpen]);

    // Actualizar búsqueda local
    useEffect(() => {
        setLocalSearchQuery(searchQuery || '');
    }, [searchQuery]);

    const submitSearch = () => {
        if (localSearchQuery.trim()) {
            handleSearch(localSearchQuery.trim());
        }
    };

    const resetFilters = () => {
        setLocalSearchQuery('');
        resetAllFilters();
    };

    return (
        <div className="filter-system" ref={filterRef}>
            {/* Botón principal */}
            <button 
                className={`filter-trigger ${activeFiltersCount > 0 ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="filter-icon">
                    <ion-icon name="options-outline"></ion-icon>
                    {activeFiltersCount > 0 && (
                        <span className="filter-count">{activeFiltersCount}</span>
                    )}
                </div>
                <span>FILTROS</span>
            </button>

            {/* Panel horizontal simple */}
            {isOpen && (
                <div className="filter-panel-horizontal">
                    {/* Búsqueda */}
                    <div className="filter-section">
                        <label>Buscar:</label>
                        <div className="search-input">
                            <input
                                type="text"
                                placeholder="Buscar eventos..."
                                value={localSearchQuery}
                                onChange={(e) => setLocalSearchQuery(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && submitSearch()}
                            />
                            <button onClick={submitSearch}>
                                <ion-icon name="search"></ion-icon>
                            </button>
                        </div>
                    </div>

                    {/* Género */}
                    <div className="filter-section">
                        <label>Género:</label>
                        <select 
                            value={filters.genre || ''} 
                            onChange={(e) => updateFilters({ genre: e.target.value })}
                        >
                            <option value="">Todos</option>
                            {genres.map(genre => (
                                <option key={genre} value={genre}>{genre}</option>
                            ))}
                        </select>
                    </div>

                    {/* Ubicación */}
                    <div className="filter-section">
                        <label>Ubicación:</label>
                        <select 
                            value={filters.location || ''} 
                            onChange={(e) => updateFilters({ location: e.target.value })}
                        >
                            <option value="">Todas</option>
                            {cities.map(city => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>

                    {/* Fechas */}
                    <div className="filter-section">
                        <label>Desde:</label>
                        <input 
                            type="date" 
                            value={filters.dateFrom || ''} 
                            onChange={(e) => updateFilters({ dateFrom: e.target.value })}
                        />
                    </div>

                    <div className="filter-section">
                        <label>Hasta:</label>
                        <input 
                            type="date" 
                            value={filters.dateTo || ''} 
                            onChange={(e) => updateFilters({ dateTo: e.target.value })}
                        />
                    </div>

                    {/* Reset */}
                    <div className="filter-section">
                        <button className="reset-btn" onClick={resetFilters}>
                            <ion-icon name="refresh"></ion-icon>
                            Reset
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterBar;