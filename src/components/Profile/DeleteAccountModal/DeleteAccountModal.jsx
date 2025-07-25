import React, { useEffect, useCallback, memo } from 'react';
import "./DeleteAccountModal.css";

const DeleteAccountModal = memo(( {
     // Props de estado
     showModal,
     deletePhase,
     deleteProgress,
     matrixCode,
     deleteError,
     deleteLoading,

     // Props de las actions
     onStartSequence,
     onCancel,
     onDeleteAccount,
     onSetMatrixCode,
     onSetDeleteProgress
     } ) => {
     console.log('🔄 DeleteAccountModal renderizado');
     useEffect( () => {
          let interval;
          if ( deletePhase === 1 ) {
               interval = setInterval( () => {
                    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
                    const randomChar = () => chars[ Math.floor( Math.random() * chars.length ) ];
                    onSetMatrixCode( Array( 20 ).fill( 0 ).map( () => randomChar() ).join( '' ) );
               }, 100 );
          } else if ( deletePhase === 2 ) {
               interval = setInterval( () => {
                    const currentProgress = deleteProgress;
                    if ( currentProgress >= 100 ) {
                         onDeleteAccount();
                    } else {
                         onSetDeleteProgress( currentProgress + Math.random() * 15 );
                    }
               }, 200 );
          }
          return () => {
               if ( interval ) {
                    clearInterval( interval );
               }
          };
     }, [ deletePhase, deleteProgress ] );

     useEffect( () => {
          const handleEscKey = ( event ) => {
               if ( event.key === 'Escape' && showModal ) {
                    onCancel();
               }
          };

          if ( showModal ) {
               window.addEventListener( 'keydown', handleEscKey );
          }

          return () => {
               window.removeEventListener( 'keydown', handleEscKey );
          };
     }, [ showModal ] );


     if ( !showModal ) return null;

     return (
          <div
               className="confirm-dialog-overlay"
               onClick={ () => !deleteLoading && deletePhase === 0 && onCancel() }
          >
               <div
                    className="confirm-dialog"
                    onClick={ ( e ) => e.stopPropagation() }
               >
                    { deletePhase === 0 ? (
                         // ⭐ FASE 0: PROTOCOLO DE ELIMINACIÓN ⭐
                         <>
                              <h3>PROTOCOLO DE ELIMINACIÓN</h3>
                              <div className="warning-icon">⚠</div>
                              <p className="delete-warning">
                                   ADVERTENCIA: Estás a punto de iniciar el protocolo de eliminación de cuenta.
                                   Esta acción es irreversible y todos tus datos serán eliminados permanentemente.
                              </p>
                              <div className="delete-details">
                                   <div className="delete-detail-item">
                                        <span className="detail-icon">👤</span>
                                        <span>Datos de perfil y usuario</span>
                                   </div>
                                   <div className="delete-detail-item">
                                        <span className="detail-icon">❤️</span>
                                        <span>Lista de favoritos</span>
                                   </div>
                                   <div className="delete-detail-item">
                                        <span className="detail-icon">⭐</span>
                                        <span>Reviews y comentarios</span>
                                   </div>
                              </div>

                              { deleteError && <div className="error-message">{ deleteError }</div> }

                              <div className="confirm-dialog-buttons">
                                   <button
                                        className="initiate-sequence-button"
                                        onClick={ onStartSequence }
                                        disabled={ deleteLoading }
                                   >
                                        INICIAR SECUENCIA DE ELIMINACIÓN
                                   </button>
                                   <button
                                        className="cancel-button"
                                        onClick={ onCancel }
                                        disabled={ deleteLoading }
                                   >
                                        ABORTAR
                                   </button>
                              </div>
                         </>
                    ) : deletePhase === 1 ? (
                         // ⭐ FASE 1: ANIMACIÓN MATRIX ⭐
                         <div className="matrix-phase">
                              <div className="matrix-code">{ matrixCode }</div>
                              <p className="matrix-message">Iniciando protocolo de eliminación...</p>
                              <p className="matrix-submessage">Desvinculando sistemas...</p>
                         </div>
                    ) : (
                         // ⭐ FASE 2: BARRA DE PROGRESO ⭐
                         <div className="deletion-progress">
                              <div className="progress-bar">
                                   <div
                                        className="progress-fill"
                                        style={ { width: `${ deleteProgress }%` } }
                                   ></div>
                              </div>
                              <p className="progress-percentage">{ Math.min( 100, Math.floor( deleteProgress ) ) }%</p>
                              <p className="progress-message">
                                   { deleteProgress < 30 ? 'Eliminando datos de perfil...' :
                                        deleteProgress < 60 ? 'Borrando favoritos y reviews...' :
                                             deleteProgress < 90 ? 'Desvinculando cuenta...' :
                                                  'Finalizando proceso de eliminación...' }
                              </p>
                              <button
                                   className="emergency-stop-button"
                                   onClick={ onCancel }
                              >
                                   PARADA DE EMERGENCIA
                              </button>
                         </div>
                    ) }
               </div>
          </div>
     );
});

export default DeleteAccountModal;