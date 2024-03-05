import { PauseCircleIcon, PlayCircleIcon } from "@heroicons/react/24/outline";

function ImageTrack({
  src,
  handleChangeSound,
  playSong,
}: {
  src: string;
  handleChangeSound: () => void;
  playSong: boolean;
}) {
  return (
    <div
      className="relative h-[100px] w-[100px]"
      onClick={(e) => {
        e.preventDefault();
        handleChangeSound();
      }}
    >
      <img
        className="h-[100px] w-[100px] rounded-lg object-cover object-center"
        src={src}
        alt="track"
      />
      <div className="absolute top-[0px] bg-gray-300 bg-opacity-40 z-10 h-full w-full flex items-center justify-center">
        {!playSong ? (
          <PlayCircleIcon
            strokeWidth={2}
            className="w-[36px] h-[36px] text-white"
          />
        ) : (
          <PauseCircleIcon
            strokeWidth={2}
            className="w-[36px] h-[36px] text-white"
          />
        )}
      </div>
    </div>
  );
}

export default ImageTrack;
