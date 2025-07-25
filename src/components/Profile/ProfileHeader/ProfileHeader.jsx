import React, { memo } from 'react';
import './ProfileHeader.css';

const ProfileHeader = memo(( {
     user,
     userDetails,
     formatDate
} ) => {
     console.log('🔄 ProfileHeader renderizado');
     return (
          <div className="profile-user-info">
               <div className="profile-avatar">
                    <img
                         src={ user.avatar || userDetails?.avatar || 'https://res.cloudinary.com/dafjggs2p/image/upload/v1744369015/pulse/avatar_nsx2kr.png' }
                         alt={ user.username }
                         onError={ ( e ) => {
                              e.target.src = 'https://res.cloudinary.com/dafjggs2p/image/upload/v1744369012/pulse/avatar1_qlx3ex.png';
                         } }
                    />
               </div>
               <div className="profile-details">
                    <h3>{ user.username }</h3>
                    <p>{ user.email }</p>
                    { userDetails?.createdAt && (
                         <p className="member-since">
                              Miembro desde { formatDate( userDetails.createdAt ) }
                         </p>
                    ) }
               </div>
          </div>
     );
});

export default ProfileHeader;