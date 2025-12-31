import { useState, useEffect, useRef } from 'react';
import { createLog } from '../../services/logService';
import { toast } from 'react-hot-toast';

const WORK_MINUTES = 25;
const BREAK_MINUTES = 5;

const PomodoroTimer = () => {
  const [seconds, setSeconds] = useState(WORK_MINUTES * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  useEffect(() => {
    if (seconds < 0) {
      if (isBreak) {
        // break finished -> start new work session
        setIsBreak(false);
        setSeconds(WORK_MINUTES * 60);
      } else {
        // work session finished -> auto log and start break
        (async () => {
          try {
            await createLog({
            title: 'Pomodoro Session',
            category: 'Coding',
            duration: WORK_MINUTES * 60,
            date: new Date().toISOString(),
            notes: 'Auto-logged pomodoro focus session',
          });
          toast.success('Pomodoro logged');
        } catch (err) {
          console.error(err);
        }
        })();
        setIsBreak(true);
        setSeconds(BREAK_MINUTES * 60);
      }
    }
  }, [seconds, isBreak]);

  const toggle = () => setIsRunning(!isRunning);
  const reset = () => {
    setIsRunning(false);
    setIsBreak(false);
    setSeconds(WORK_MINUTES * 60);
  };

  const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');

  return (
    <div className="flex flex-col items-center gap-2">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        {isBreak ? 'Break' : 'Focus'} Session
      </h2>
      <span className="text-4xl font-mono text-indigo-600 dark:text-indigo-400">
        {minutes}:{secs}
      </span>
      <div className="flex gap-2">
        <button
          onClick={toggle}
          className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700"
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={reset}
          className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-md"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
