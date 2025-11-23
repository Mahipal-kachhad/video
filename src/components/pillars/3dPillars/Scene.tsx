import { Html } from "@react-three/drei";
import { useEffect, useState } from "react";
import SceneContent, { SceneDataMap } from "./SceneContent";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

interface Pillar {
  title: string;
  icon_path: string;
  content: string;
  img: string;
}

export interface Hotspot {
  x: number;
  y: number;
  z: number;
  target: string;
  label: string;
  content: string;
  img: string | null;
}

export interface Scene {
  id: string;
  texture: string;
  content: string;
  title:string;
  hotspots: Hotspot[];
}

export interface SceneData {
  [key: string]: Scene;
}

const Scene = () => {
  const [sceneData, setSceneData] = useState<SceneDataMap | null>(null);
  const [loading, setLoading] = useState(true);
  const pathName = usePathname();
  const lang = pathName.split("/")[1] || "en";
  const title =
    lang === "hi" ? "title_hin" : lang === "gu" ? "title" : "title_en";
  const content =
    lang === "hi" ? "content_hin" : lang === "gu" ? "content" : "content_en";
  const t = useTranslations();
  const [pillarsContent, setPillarContent] = useState<Pillar[]>([]);
  const [defaultSceneData, setDefaultSceneData] = useState<SceneData>({
    pathshala: {
      id: "pathshala",
      content: "loading...",
      title:"loading...",
      texture: "/images/img1.jpg",
      hotspots: [
        {
          x: 0,
          y: -2,
          z: 49,
          target: "outPost",
          label: "Out Post",
          content: "",
          img: null,
        },
      ],
    },
  });

  useEffect(() => {
    axios
      .get("https://dhamadmin.cesihpl.com/edit_pillars_guj.php?action=list")
      .then((data: any) => {
        const mapped = data.data.pillars.map((val: any) => ({
          title: val[title],
          content: val[content],
          img: `https://dhamadmin.cesihpl.com/${val.image_path}`,
        }));
        setPillarContent(mapped);
      });
  }, []);

  useEffect(() => {
    if (pillarsContent.length === 0) return;

    setDefaultSceneData({
      pathshala: {
        id: "pathshala",
        texture: "/images/img1.jpg",
        content: pillarsContent[0].content,
        title: pillarsContent[0].title,
        hotspots: [
          {
            x: 49,
            y: -2,
            z: 0,
            target: "himalayas",
            label: pillarsContent[1].title,
            content: pillarsContent[1].content,
            img: pillarsContent[1].img,
          },
          {
            x: 0,
            y: -2,
            z: -49,
            target: "gokuldham",
            label: pillarsContent[2].title,
            content: pillarsContent[2].content,
            img: pillarsContent[2].img,
          },
          {
            x: -49,
            y: -2,
            z: 0,
            target: "yagnaShala",
            label: pillarsContent[3].title,
            content: pillarsContent[3].content,
            img: pillarsContent[3].img,
          },
          {
            x: 24,
            y: -2,
            z: 24,
            target: "vaikunthdham",
            label: pillarsContent[4].title,
            content: pillarsContent[4].content,
            img: pillarsContent[4].img,
          },
          {
            x: 24,
            y: -2,
            z: -24,
            target: "panchvati",
            label: pillarsContent[5].title,
            content: pillarsContent[5].content,
            img: pillarsContent[5].img,
          },
          {
            x: -24,
            y: -2,
            z: 24,
            target: "prakrutiVan",
            label: pillarsContent[6].title,
            content: pillarsContent[6].content,
            img: pillarsContent[6].img,
          },
        ],
      },
      himalayas: {
        id: "himalayas",
        content: pillarsContent[1].content,
        title: pillarsContent[1].title,
        texture: "/images/img2.jpg",
        hotspots: [
          {
            x: 0,
            y: -2,
            z: 49,
            target: "pathshala",
            label: pillarsContent[0].title,
            content: pillarsContent[0].content,
            img: pillarsContent[0].img,
          },
          {
            x: 0,
            y: -2,
            z: -49,
            target: "gokuldham",
            label: pillarsContent[2].title,
            content: pillarsContent[2].content,
            img: pillarsContent[2].img,
          },
          {
            x: -49,
            y: -2,
            z: 0,
            target: "yagnaShala",
            label: pillarsContent[3].title,
            content: pillarsContent[3].content,
            img: pillarsContent[3].img,
          },
          {
            x: 24,
            y: -2,
            z: 24,
            target: "vaikunthdham",
            label: pillarsContent[4].title,
            content: pillarsContent[4].content,
            img: pillarsContent[4].img,
          },
          {
            x: 24,
            y: -2,
            z: -24,
            target: "panchvati",
            label: pillarsContent[5].title,
            content: pillarsContent[5].content,
            img: pillarsContent[5].img,
          },
          {
            x: -24,
            y: -2,
            z: 24,
            target: "prakrutiVan",
            label: pillarsContent[6].title,
            content: pillarsContent[6].content,
            img: pillarsContent[6].img,
          },
        ],
      },
      gokuldham: {
        id: "gokuldham",
        content: pillarsContent[2].content,
        title: pillarsContent[2].title,
        texture: "/images/img3.jpg",
        hotspots: [
          {
            x: 0,
            y: -2,
            z: 49,
            target: "pathshala",
            label: pillarsContent[0].title,
            content: pillarsContent[0].content,
            img: pillarsContent[0].img,
          },
          {
            x: 49,
            y: -2,
            z: 0,
            target: "himalayas",
            label: pillarsContent[1].title,
            content: pillarsContent[1].content,
            img: pillarsContent[1].img,
          },

          {
            x: -49,
            y: -2,
            z: 0,
            target: "yagnaShala",
            label: pillarsContent[3].title,
            content: pillarsContent[3].content,
            img: pillarsContent[3].img,
          },
          {
            x: 24,
            y: -2,
            z: 24,
            target: "vaikunthdham",
            label: pillarsContent[4].title,
            content: pillarsContent[4].content,
            img: pillarsContent[4].img,
          },
          {
            x: 24,
            y: -2,
            z: -24,
            target: "panchvati",
            label: pillarsContent[5].title,
            content: pillarsContent[5].content,
            img: pillarsContent[5].img,
          },
          {
            x: -24,
            y: -2,
            z: 24,
            target: "prakrutiVan",
            label: pillarsContent[6].title,
            content: pillarsContent[6].content,
            img: pillarsContent[6].img,
          },
        ],
      },
      yagnaShala: {
        id: "yagnaShala",
        content: pillarsContent[3].content,
        title: pillarsContent[3].title,
        texture: "/images/img4.jpg",
        hotspots: [
          {
            x: 0,
            y: -2,
            z: 49,
            target: "pathshala",
            label: pillarsContent[0].title,
            content: pillarsContent[0].content,
            img: pillarsContent[0].img,
          },
          {
            x: 49,
            y: -2,
            z: 0,
            target: "himalayas",
            label: pillarsContent[1].title,
            content: pillarsContent[1].content,
            img: pillarsContent[1].img,
          },
          {
            x: 0,
            y: -2,
            z: -49,
            target: "gokuldham",
            label: pillarsContent[2].title,
            content: pillarsContent[2].content,
            img: pillarsContent[2].img,
          },

          {
            x: 24,
            y: -2,
            z: 24,
            target: "vaikunthdham",
            label: pillarsContent[4].title,
            content: pillarsContent[4].content,
            img: pillarsContent[4].img,
          },
          {
            x: 24,
            y: -2,
            z: -24,
            target: "panchvati",
            label: pillarsContent[5].title,
            content: pillarsContent[5].content,
            img: pillarsContent[5].img,
          },
          {
            x: -24,
            y: -2,
            z: 24,
            target: "prakrutiVan",
            label: pillarsContent[6].title,
            content: pillarsContent[6].content,
            img: pillarsContent[6].img,
          },
        ],
      },
      vaikunthdham: {
        id: "vaikunthdham",
        content: pillarsContent[4].content,
        title: pillarsContent[4].title,
        texture: "/images/img1.jpg",
        hotspots: [
          {
            x: 0,
            y: -2,
            z: 49,
            target: "pathshala",
            label: pillarsContent[0].title,
            content: pillarsContent[0].content,
            img: pillarsContent[0].img,
          },
          {
            x: 49,
            y: -2,
            z: 0,
            target: "himalayas",
            label: pillarsContent[1].title,
            content: pillarsContent[1].content,
            img: pillarsContent[1].img,
          },
          {
            x: 0,
            y: -2,
            z: -49,
            target: "gokuldham",
            label: pillarsContent[2].title,
            content: pillarsContent[2].content,
            img: pillarsContent[2].img,
          },
          {
            x: -49,
            y: -2,
            z: 0,
            target: "yagnaShala",
            label: pillarsContent[3].title,
            content: pillarsContent[3].content,
            img: pillarsContent[3].img,
          },
          {
            x: 24,
            y: -2,
            z: -24,
            target: "panchvati",
            label: pillarsContent[5].title,
            content: pillarsContent[5].content,
            img: pillarsContent[5].img,
          },
          {
            x: -24,
            y: -2,
            z: 24,
            target: "prakrutiVan",
            label: pillarsContent[6].title,
            content: pillarsContent[6].content,
            img: pillarsContent[6].img,
          },
        ],
      },
      panchvati: {
        id: "panchvati",
        content: pillarsContent[5].content,
        title: pillarsContent[5].title,
        texture: "/images/img2.jpg",
        hotspots: [
          {
            x: 0,
            y: -2,
            z: 49,
            target: "pathshala",
            label: pillarsContent[0].title,
            content: pillarsContent[0].content,
            img: pillarsContent[0].img,
          },
          {
            x: 49,
            y: -2,
            z: 0,
            target: "himalayas",
            label: pillarsContent[1].title,
            content: pillarsContent[1].content,
            img: pillarsContent[1].img,
          },
          {
            x: 0,
            y: -2,
            z: -49,
            target: "gokuldham",
            label: pillarsContent[2].title,
            content: pillarsContent[2].content,
            img: pillarsContent[2].img,
          },
          {
            x: -49,
            y: -2,
            z: 0,
            target: "yagnaShala",
            label: pillarsContent[3].title,
            content: pillarsContent[3].content,
            img: pillarsContent[3].img,
          },
          {
            x: 24,
            y: -2,
            z: 24,
            target: "vaikunthdham",
            label: pillarsContent[4].title,
            content: pillarsContent[4].content,
            img: pillarsContent[4].img,
          },
          {
            x: -24,
            y: -2,
            z: 24,
            target: "prakrutiVan",
            label: pillarsContent[6].title,
            content: pillarsContent[6].content,
            img: pillarsContent[6].img,
          },
        ],
      },
      prakrutiVan: {
        id: "prakrutiVan",
        content: pillarsContent[6].content,
        title: pillarsContent[6].title,
        texture: "/images/img3.jpg",
        hotspots: [
          {
            x: 0,
            y: -2,
            z: 49,
            target: "pathshala",
            label: pillarsContent[0].title,
            content: pillarsContent[0].content,
            img: pillarsContent[0].img,
          },
          {
            x: 49,
            y: -2,
            z: 0,
            target: "himalayas",
            label: pillarsContent[1].title,
            content: pillarsContent[1].content,
            img: pillarsContent[1].img,
          },
          {
            x: 0,
            y: -2,
            z: -49,
            target: "gokuldham",
            label: pillarsContent[2].title,
            content: pillarsContent[2].content,
            img: pillarsContent[2].img,
          },
          {
            x: -49,
            y: -2,
            z: 0,
            target: "yagnaShala",
            label: pillarsContent[3].title,
            content: pillarsContent[3].content,
            img: pillarsContent[3].img,
          },
          {
            x: 24,
            y: -2,
            z: 24,
            target: "vaikunthdham",
            label: pillarsContent[4].title,
            content: pillarsContent[4].content,
            img: pillarsContent[4].img,
          },
          {
            x: 24,
            y: -2,
            z: -24,
            target: "panchvati",
            label: pillarsContent[5].title,
            content: pillarsContent[5].content,
            img: pillarsContent[5].img,
          },
        ],
      },
    });
  }, [pillarsContent]);

  useEffect(() => {
    if (!defaultSceneData) return;

    setSceneData(defaultSceneData);
    setLoading(false);
  }, [defaultSceneData]);

  if (loading || !sceneData) {
    return (
      <Html center>
        <div className="text-white text-xl font-bold animate-pulse">
          Loading 360 Tour...
        </div>
      </Html>
    );
  }

  return <SceneContent data={sceneData} />;
};

export default Scene;
