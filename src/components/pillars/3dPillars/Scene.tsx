import { Html } from "@react-three/drei";
import { useEffect, useState } from "react";
import SceneContent, {
  SceneDataMap,
  PolygonData,
  HotspotData,
} from "./SceneContent";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { getCubicCurve } from "./geometry";

interface Pillar {
  title: string;
  icon_path: string;
  content: string;
  img: string;
}

export interface Scene {
  id: string;
  texture: string;
  content: string;
  title: string;
  hotspots: HotspotData[];
  polygons?: PolygonData[];
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
      title: "loading...",
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
      // Initialize with empty polygons or some default
      polygons: [],
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
        polygons: [
          {
            points: [
              [-15.314717852047789, -20.83062830089439, 42.69729685360422],
              [-22.44661989565188, -19.709404409490677, 40.03932011746839],
              [-23.332923577570167, -20.899885090026547, 38.88268025570218],
              [-15.9746178743651, -22.124663165756314, 41.805860353328356],
            ],
            target: "himalayas",
          },
          {
            points: [
              [17.6, -20.4, 42.0],
              [13.0, -20.3, 43.6],
              [12.9, -22.2, 42.8],
              [17.2, -22.3, 41.2],
            ],
            borderColor: "red",
            target: "himalayas",
          },
          {
            points: [
              ...getCubicCurve(
                [-49.70353194092932, 1.6992665385083545, 4.383008591736582],
                [-49.276775008499534, 7.1440268500176956, 3.584447641033563],
                [-49.41710264119804, 6.072143559751353, -3.327597491926373],
                [-49.755808417622795, 1.610426544426799, -3.452104881739308]
              ),
              [-49.17937200690465, -8.025925307866073, -3.1374583805706635],
              [-49.15993668694609, -7.860425433511813, 4.136452325790635],
            ] as [number, number, number][],
            borderColor: "red",
            target: "himalayas",
          },
        ],
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
        polygons: [],
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
        polygons: [],
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
        polygons: [],
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
        texture: "/images/img5.jpg",
        polygons: [],
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
        texture: "/images/img6.jpg",
        polygons: [],
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
        texture: "/images/img7.jpg",
        polygons: [],
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
