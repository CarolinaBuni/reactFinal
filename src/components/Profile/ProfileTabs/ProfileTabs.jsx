import './ProfileTabs.css';
import React, { memo } from 'react';

const ProfileTabs = memo(( {
     activeTab,
     favoritesCount,
     reviewCount,
     onTabChange,
} ) => {
     console.log('🔄 ProfileTabs renderizado');
     return (
          <div className="profile-tabs">
               <button
                    className={ activeTab === 'info' ? 'active' : '' }
                    onClick={ () => onTabChange( 'info' ) }
               >
                    Información
               </button>
               <button
                    className={ activeTab === 'favorites' ? 'active' : '' }
                    onClick={ () => onTabChange( 'favorites' ) }
               >
                    Favoritos ({ favoritesCount })
               </button>
               <button
                    className={ activeTab === 'reviews' ? 'active' : '' }
                    onClick={ () => onTabChange( 'reviews' ) }
               >
                    Reviews { reviewCount > 0 && `(${ reviewCount })` }
               </button>
          </div>
     );
});

export default ProfileTabs;