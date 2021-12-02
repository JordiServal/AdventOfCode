using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace ConsoleApp1._2021 {
    class Exercise2 {
        public static void P1() {
            List<string> lines = File.ReadAllLines("E:/Input.txt").ToList();

            int hPos = 0;
            int depth = 0;
            foreach (string line in lines) {
                string[] args = line.Split(" ", StringSplitOptions.RemoveEmptyEntries);
                string command = args[0];
                int amount = int.Parse(args[1]);

                switch (command) {
                    case "forward":
                        hPos += amount;
                        break;
                    case "down":
                        depth += amount;
                        break;
                    case "up":
                        depth -= amount;
                        break;
                }
            }

            Console.WriteLine(hPos * depth);
        }

        public static void P2() {
            List<string> lines = File.ReadAllLines("E:/Input.txt").ToList();

            int hPos = 0;
            int depth = 0;
            int aim = 0;
            foreach (string line in lines) {
                string[] args = line.Split(" ", StringSplitOptions.RemoveEmptyEntries);
                string command = args[0];
                int amount = int.Parse(args[1]);

                switch (command) {
                    case "forward":
                        hPos += amount;
                        depth += aim * amount;
                        break;
                    case "down":
                        aim += amount;
                        break;
                    case "up":
                        aim -= amount;
                        break;
                }
            }

            Console.WriteLine(hPos * depth);
        }
    }
}
