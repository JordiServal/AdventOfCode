using System.Linq;
using System;
using System.IO;
using System.Xml.Schema;
using System.Text.RegularExpressions;

string[] input = File.ReadLines("/home/mono/RiderProjects/AdventOfCode/input").ToArray();

// Part 1
int[] racesTimes = Array.ConvertAll(input[0].Split(':')[1].Split(' ').Where(x => ! string.IsNullOrEmpty(x)).ToArray(), int.Parse);
int[] racesDistanceGoals = Array.ConvertAll(input[1].Split(':')[1].Split(' ').Where(x => ! string.IsNullOrEmpty(x)).ToArray(), int.Parse);

int totalWays = 1;
for (int raceID = 0; raceID < racesTimes.Length; raceID++)
{
    int t = racesTimes[raceID];
    int d = racesDistanceGoals[raceID];
    int countWaysToWin = 0;


    // Mathematical expression to limit the range:
    int minAt = (int)Math.Floor((t-Math.Sqrt(Math.Pow(t,2) - 4 * d - 4))/(2));
    int maxAt = (int)Math.Ceiling((t+Math.Sqrt(Math.Pow(t,2) - 4 * d - 4))/(2));

    for (int At = minAt; At <= maxAt; At++)
    {
        int coveredDistance = At * (t - At);
        if (coveredDistance > d)
        {
            countWaysToWin++;
        }
    }

    totalWays *= countWaysToWin;
}

Console.WriteLine($"Solution Part 1: {totalWays} \n");

// Part 2
long racesTimes2 = Convert.ToInt64(String.Concat(input[0].Split(':')[1].Where(c => !Char.IsWhiteSpace(c))));
long racesDistanceGoals2 = Convert.ToInt64(String.Concat(input[1].Split(':')[1].Where(c => !Char.IsWhiteSpace(c))));

int totalWays2 = 1;

long t2 = racesTimes2;
long d2 = racesDistanceGoals2;
int countWaysToWin2 = 0;


// Mathematical expression to limit the range:
long minAt2 = (int)Math.Floor((t2-Math.Sqrt(Math.Pow(t2,2) - 4 * d2 - 4))/(2));
long maxAt2 = (int)Math.Ceiling((t2+Math.Sqrt(Math.Pow(t2,2) - 4 * d2 - 4))/(2));

for (long At = minAt2; At <= maxAt2; At++)
{
    long coveredDistance = At * (t2 - At);
    if (coveredDistance > d2)
    {
        countWaysToWin2++;
    }
}

totalWays2 *= countWaysToWin2;


Console.WriteLine($"Solution Part 2: {totalWays2} \n");