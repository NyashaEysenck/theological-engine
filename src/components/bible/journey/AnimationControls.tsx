import { Play, Pause, RotateCcw } from 'lucide-react';
import Button from '../../common/Button';

interface AnimationControlsProps {
  isAnimating: boolean;
  animationProgress: number;
  animationSpeed: number;
  onAnimate: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
}

const AnimationControls = ({
  isAnimating,
  animationProgress,
  animationSpeed,
  onAnimate,
  onReset,
  onSpeedChange
}: AnimationControlsProps) => {
  return (
    <div className="border-t border-neutral-200 pt-4">
      <h4 className="font-medium text-neutral-900 mb-3">Animation Controls</h4>
      <div className="space-y-3">
        <div className="flex space-x-2">
          <Button
            variant="primary"
            size="sm"
            onClick={onAnimate}
            disabled={isAnimating}
            className="flex-1"
          >
            {isAnimating ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                Animating...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Animate Route
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
        
        {isAnimating && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-neutral-600">
              <span>Progress</span>
              <span>{Math.round(animationProgress * 100)}%</span>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2">
              <div 
                className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${animationProgress * 100}%` }}
              />
            </div>
          </div>
        )}
        
        {/* Animation speed control */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-neutral-600">
            <span>Animation Speed</span>
            <span>{animationSpeed}x</span>
          </div>
          <div className="flex space-x-2">
            {[0.5, 1, 2, 4].map(speed => (
              <button
                key={speed}
                onClick={() => onSpeedChange(speed)}
                className={`flex-1 py-1 px-2 text-xs rounded ${
                  animationSpeed === speed
                    ? 'bg-primary-100 text-primary-700 font-medium'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimationControls;