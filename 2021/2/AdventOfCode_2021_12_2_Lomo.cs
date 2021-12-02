using System;

namespace AdventOfCode_02
{
    class Program
    {
        static void Main(string[] args)
        {
            String FilePath = "D:/Code/AdventOfCode_02/AdventOfCode_2021_12_2_Input.txt";

            System.Console.WriteLine("Day 2 Part 1 - Amount: " + Day2Part1(FilePath));
            System.Console.WriteLine("Day 2 Part 2 - Amount: " + Day2Part2(FilePath));

            // Keep the console window open in debug mode.
            Console.WriteLine("Press any key to exit.");
            System.Console.ReadKey();
        }

        static Int32 Day2Part2(String FilePath)
        {
            Int32 Pos_Horizontal = 0;
            Int32 Pos_Depth = 0;
            Int32 AimAmount = 0;

            string[] AllLinesInFile = System.IO.File.ReadAllLines(FilePath);

            foreach (String Line in AllLinesInFile)
            {
                String[] Splitted = Line.Split(' ');
                switch (Splitted[0])
                {
                    case "forward":
                        Pos_Horizontal += Convert.ToInt32(Splitted[1]);
                        Pos_Depth += AimAmount * Convert.ToInt32(Splitted[1]);
                        break;
                    case "up":
                        AimAmount -= Convert.ToInt32(Splitted[1]);
                        break;
                    case "down":
                        AimAmount += Convert.ToInt32(Splitted[1]);
                        break;
                }
            }

            return Pos_Horizontal * Pos_Depth;
        }

        static Int32 Day2Part1(String FilePath)
        {
            Int32 Pos_Horizontal = 0;
            Int32 Pos_Depth = 0;

            string[] AllLinesInFile = System.IO.File.ReadAllLines(FilePath);

            foreach (String Line in AllLinesInFile)
            {
                String[] Splitted = Line.Split(' ');
                switch (Splitted[0])
                {
                    case "forward":
                        Pos_Horizontal += Convert.ToInt32(Splitted[1]);
                        break;
                    case "up":
                        Pos_Depth -= Convert.ToInt32(Splitted[1]);
                        break;
                    case "down":
                        Pos_Depth += Convert.ToInt32(Splitted[1]);
                        break;
                }
            }

            return Pos_Horizontal * Pos_Depth;
        }
    }
}


