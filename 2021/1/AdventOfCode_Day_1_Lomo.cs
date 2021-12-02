using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdventOfCode_01
{
    class Program
    {
        static void Main(string[] args)
        {
            String FilePath = "D:/Code/AdventOfCode_01/AdventOfCode_2021_12_1_Input.txt";

            System.Console.WriteLine("Day 1 Part 1 - Amount: " + Day1(FilePath));
            System.Console.WriteLine("Day 1 Part 2 - Amount: " + Day1Part2(FilePath));

            // Keep the console window open in debug mode.
            Console.WriteLine("Press any key to exit.");
            System.Console.ReadKey();
        }

        static Int32 Day1Part2(String FilePath)
        {
            Int32 AmountOfIncreases = 0;
            Int32 PreviousSum = 0;

            bool bIsFirstLine = true;

            string[] AllLinesInFile = System.IO.File.ReadAllLines(FilePath);

            for (int i = 0; i < AllLinesInFile.Length - 2 ; i++)
            {
                Int32 AuxSum = Convert.ToInt32(AllLinesInFile[i]) + 
                    Convert.ToInt32(AllLinesInFile[i + 1]) + Convert.ToInt32(AllLinesInFile[i + 2]);

                if(bIsFirstLine)
                {
                    bIsFirstLine = false;
                }
                else
                {
                    if(AuxSum > PreviousSum)
                    {
                        AmountOfIncreases++;
                    }
                }

                PreviousSum = AuxSum;
            }

            return AmountOfIncreases;
        }

        static Int32 Day1(String FilePath)
        {
            Int32 AmountOfIncreases = 0;
            System.IO.StreamReader OpenedFile = System.IO.File.OpenText(FilePath);

            bool bIsFirstLine = true;
            String Line = "";
            Int32 PreviousValue = 0;

            while ((Line = OpenedFile.ReadLine()) != null)
            {
                if (bIsFirstLine)
                {
                    bIsFirstLine = false;
                }
                else
                {
                    if (Convert.ToInt32(Line) > PreviousValue)
                    {
                        AmountOfIncreases++;
                    }
                }

                PreviousValue = Convert.ToInt32(Line);
            }

            OpenedFile.Close();

            return AmountOfIncreases;
        }
    }
}