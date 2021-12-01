using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

namespace ConsoleApp1
{
    class Program
    {
        static void Main(string[] args)
        {
            var list = File.ReadAllLines("E:/Input.txt");
            List<int> intlist = list.Select(x => int.Parse(x)).ToList();

            int increases = 0;

            bool option = Console.Read() == 'a';

            for(int i = option ? 1 : 3; i < intlist.Count; i++)
            {
                if (option)
                {
                    if (intlist[i] > intlist[i - 1])
                    {
                        increases++;
                    }
                }
                else
                {
                    if (intlist[i - 3] + intlist[i - 2] + intlist[i - 1] < intlist[i - 2] + intlist[i - 1] + intlist[i])
                    {
                        increases++;
                    }
                }
            }

            Console.WriteLine(increases);
        }
    }
}
