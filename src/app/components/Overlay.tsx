interface OverlayProps {
    handleConfirmLeaveGame?: () => void;
    handleCancelLeaveGame?: () => void;
}

const Overlay: React.FC<OverlayProps> = ({handleConfirmLeaveGame, handleCancelLeaveGame}) => {

  
  return (
    <div className='fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-50' style={{ backgroundColor: 'rgba(72,72,72,0.4)' }}>
          <div className='px-8 pt-6 pb-2 max-w-sm' style={{ backgroundColor: 'rgba(255,255,255,1)' }}>
            <p>BIST DU SICHER? Wenn du das Spiel jetzt schließt, wird dein Fortschritt nicht gespeichert. Du kannst das Spiel dann wieder von vorne beginnen.</p>
            <div className='flex gap-4 justify-center mt-2'>
                <button onClick={handleConfirmLeaveGame}>Yes</button>
                <button className='bg-primary text-white' onClick={handleCancelLeaveGame}>No</button>
            </div>
            
          </div>
        </div>
  );
};

export default Overlay;