import axios from "axios";
import { useEffect, useState } from "react";
import AudioPlayer from "./AudioPlayer";

export interface Audio {
  title: string;
  path: string;
  subtitle: string;
  sort: number;
  isActive: string;
  image: string;
}

const Audio = ({ activeMenu }: { activeMenu: number }) => {
  const slug = activeMenu ? "satsang" : "aarti";
  const [audio, setAudio] = useState<Audio[]>([]);
  useEffect(() => {
    axios
      .get(`https://dhamadmin.cesihpl.com/edit_${slug}_links.php?action=list`)
      .then((res) => {
        const audioData = res.data.items
          .filter((val: any) => val.is_active)
          .map((val: any) => ({
            title: val.title,
            path: `https://dhamadmin.cesihpl.com${val.audio_path}`,
            subtitle: val.subtitle,
            sort: val.sort_order,
            isActive: val.is_active,
            image: val.image_path
              ? `https://dhamadmin.cesihpl.com${val.image_path}`
              : "/imgnf.jpg",
          }));
        const sortedAudio = audioData.sort((a: any, b: any) => a.sort - b.sort);
        setAudio(sortedAudio);
      });
  }, [slug]);
  return (
    <div>
      <div className="">
        {audio.map((val, idx) => (
          <AudioPlayer val={val} key={idx} idx={idx} />
        ))}
      </div>
    </div>
  );
};

export default Audio;
