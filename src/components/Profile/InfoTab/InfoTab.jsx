import React from 'react';
import './InfoTab.css';

const InfoTab = ( {
     userDetails,
     user,
     loading,
     formatDate,
     onStartEdit,
     onLogout,
     onShowDeleteConfirm
} ) => {
     console.log('🔄 InfoTab renderizado');
     return (
          <div className="profile-info-tab">
               <div className="info-header">
                    <h4>Información Personal</h4>
                    <button
                         className="edit-profile-button"
                         onClick={ onStartEdit }
                    >
                         Editar perfil
                    </button>
               </div>

               { loading ? (
                    <p>Cargando información...</p>
               ) : (
                    <>
                         <div className="info-item">
                              <span className="label">Nombre de usuario:</span>
                              <span className="value">{ userDetails?.username || user.username }</span>
                         </div>
                         <div className="info-item">
                              <span className="label">Email:</span>
                              <span className="value">{ userDetails?.email || user.email }</span>
                         </div>
                         <div className="info-item">
                              <span className="label">Rol:</span>
                              <span className="value">{ userDetails?.role || user.role }</span>
                         </div>
                         <div className="info-item">
                              <span className="label">Miembro desde:</span>
                              <span className="value">
                                   { userDetails?.createdAt ? formatDate( userDetails.createdAt ) : 'N/A' }
                              </span>
                         </div>
                    </>
               ) }

               <div className="profile-actions">
                    <button className="logout-button" onClick={ onLogout }>
                         Cerrar Sesión
                    </button>
                    <button
                         className="delete-account-button"
                         onClick={ onShowDeleteConfirm }
                    >
                         Eliminar cuenta
                    </button>
               </div>
          </div>
     );
};

export default InfoTab;