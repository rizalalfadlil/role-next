"use client";
import React, { useRef, useState } from "react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

// Fungsi untuk menghasilkan nilai acak berbasis Base64
const getRandomValuesFromImage = (base64String: any, divideBy: number) => {
  const part = splitStringIntoParts(base64String, divideBy);
  const partNumber = part.map((s) => getRandomIntFromString(s));

  console.log(getRandomIntFromString(base64String) % 2 == 0);

  const diffrentizedPartNumber = partNumber.map((s, i) => s + i);
  console.log(diffrentizedPartNumber);

  return diffrentizedPartNumber;
};

function getRandomIntFromString(str: string, min = 0, max = 1000) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  const randomInt = (Math.abs(hash) % (max - min + 1)) + min;
  return randomInt;
}

function splitStringIntoParts(str: string, parts: number) {
  const result = [];
  const partSize = Math.floor(str.length / parts); // Ukuran bagian yang hampir rata
  let remainder = str.length % parts; // Sisa karakter yang akan ditambahkan ke bagian terakhir

  let start = 0;

  for (let i = 0; i < parts; i++) {
    let extraChar = remainder > 0 ? 1 : 0; // Tambahkan 1 karakter ekstra jika masih ada sisa
    result.push(str.slice(start, start + partSize + extraChar)); // Potong string
    start += partSize + extraChar; // Pindah ke bagian berikutnya
    remainder--; // Kurangi sisa karakter
  }

  return result;
}

// Komponen RadarChart
export function RadarComponent() {
  const [chartData, setChartData]: any = useState([]);
  const [fileUrl, setfileUrl] = useState("");
  const fileInputRef = useRef(null);
  const [name, setname] = useState("");

  const [resultData, setResultData]: any = useState({});
  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    setfileUrl(URL.createObjectURL(file));
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      // Dapatkan nilai acak dari gambar
      const values = getRandomValuesFromImage(base64String, 6);

      // Format data untuk chart
      const newChartData = [
        {
          category: "243",
          value: values[0],
          text: [
            { img: "https://picsum.photos/id/1/200/300", text: "asdasd" },
            { img: "https://picsum.photos/id/2341/200/300", text: "asdf asd" },
          ],
        },
        {
          category: "Aasasddasd",
          value: values[1],
          text: [
            { img: "https://picsum.photos/id/121/200/300", text: "asdasd" },
            { img: "https://picsum.photos/id/221/200/300", text: "asdf asd" },
          ],
        },
        {
          category: "Aasda32sd",
          value: values[2],
          text: [
            { img: "https://picsum.photos/id/31/200/300", text: "asdasd" },
            { img: "https://picsum.photos/id/2341/200/300", text: "asdf asd" },
          ],
        },
        {
          category: "Aasdasd",
          value: values[3],
          text: [
            { img: "https://picsum.photos/id/111/200/300", text: "asdasd" },
            { img: "https://picsum.photos/id/232/200/300", text: "asdf asd" },
          ],
        },
        {
          category: "235Aasdasd",
          value: values[4],
          text: [
            { img: "https://picsum.photos/id/15/200/300", text: "asdasd" },
            { img: "https://picsum.photos/id/441/200/300", text: "asdf asd" },
          ],
        },
        {
          category: "Aas235dasd",
          value: values[5],
          text: [
            { img: "https://picsum.photos/id/21/200/300", text: "asdasd" },
            { img: "https://picsum.photos/id/211/200/300", text: "asdf asd" },
          ],
        },
      ];

      setChartData(newChartData);

      setResultData(() => {
        const top = sortChartDataByValue(newChartData)[0];
        console.log(top);
        return {
          category: top.category,
          text: getRandomElementFromArray(top.text).text,
          image: getRandomElementFromArray(top.text).img,
        };
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
  };
  const triggerFileUpload = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  function sortChartDataByValue(chartData: any) {
    return chartData.sort(
      (a: { value: number }, b: { value: number }) => b.value - a.value
    );
  }

  function getRandomElementFromArray(arr: any[]) {
    const randomIndex = Math.floor(Math.random() * arr.length); // Pilih indeks acak
    console.log(randomIndex);
    return arr[randomIndex]; // Kembalikan elemen di indeks acak
  }

  function reset() {
    setChartData([]);
    setfileUrl("");
    setname("");
    setResultData({});
  }
  return (
    <div className="pt-4">
      <CardContent className={`space-y-8 ${chartData.length > 0 && "grid sm:grid-cols-2 place-content-center"}`}>
        {chartData.length > 0 ? (
          <>
            <div className="space-y-4 grid place-content-center">
              <p className="text-lg font-bold uppercase">{name}</p>
              <div
                className="w-40 aspect-square bg-cover bg-center bg-no-repeat border rounded-md"
                style={{ backgroundImage: `url("${fileUrl}")` }}
              />
            </div>

            <div className="">
              <ChartContainer config={chartConfig} className=" aspect-square">
                <RadarChart
                  data={chartData}
                  startAngle={80}
                >
                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                  <PolarAngleAxis dataKey="category" orientation="inside"/>
                  <PolarGrid />
                  
                  <Radar
                    name="score"
                    dataKey="value"
                    stroke="#1c5ad5"
                    fill="#1c5ad5"
                    fillOpacity={0.1}
                  />
                </RadarChart>
              </ChartContainer>
              <div className="grid place-content-center text-center space-y-4">
                <p>{name} you are</p>
                <p className="font-bold text-lg">{resultData.category}</p>
                <div
                  style={{ backgroundImage: `url("${resultData.image}")` }}
                  className="w-40 bg-cover rounded-md bg-center bg-no-repeat aspect-square"
                />
                <p>{resultData.text}</p>
              </div>
              <Button className="w-full mt-4" onClick={reset}>
                Reset
              </Button>
            </div>
          </>
        ) : (
          <div className="space-y-4 grid content-center w-full">
            <div className="space-y-2">
              <label>nama</label>
              <Input
                className=" transition-all"
                value={name}
                placeholder="masukkan nama"
                onChange={(e) => setname(e.target.value)}
              />
            </div>
            <input
              className="hidden"
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
            />
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label>foto</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Info size={16} />
                  </PopoverTrigger>
                  <PopoverContent side="left" className="w-60 sm:max-w-screen-sm">
                    <p>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Quo, eos culpa sed quam nesciunt praesentium nobis, ab
                      consequatur ut eum ex. Quia harum repellendus, neque animi
                      ipsa laudantium numquam sunt.
                    </p>
                  </PopoverContent>
                </Popover>
              </div>

              <Button
                disabled={name === ""}
                onClick={triggerFileUpload}
                className=" w-full"
                variant="secondary"
              >
                upload
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </div>
  );
}
