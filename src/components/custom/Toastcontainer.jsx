import { ToastContainer, toast } from 'react-toastify';
import Button from '../ui/button/Button'; // Assuming Button is located in this path

export default function ToastComponent({ position, autoClose }) {
  const notify = () => toast('Wow so easy !');

  return (
    <div className="grid place-items-center h-dvh bg-zinc-900/15">
      <Button onClick={notify}>Notify !</Button>
      <ToastContainer position={position} autoClose={autoClose} />
    </div>
  );
}
