using System;
using System.Linq;
using System.IO;
using System.Xml.Schema;

string[] lines = File.ReadLines("input-01").ToArray();


// int max_lines = 5; 
int max_lines = lines.Length;

int[,] lines_array = new int[max_lines, 3];
int max_blue_cubes = 14;
int max_green_cubes = 13;
int max_red_cubes = 12;
int possible_games_ids_sum = 0;

for (int n_line = 0; n_line < max_lines; n_line++)
{

    // Extract Game ID
    int game_id = Convert.ToInt32(lines[n_line].Split(':')[0].Split(' ')[1]);

    // Divide game by sets: 
    string[] game_result = lines[n_line].Split(':')[1].Split(';'); //  ["3 blue, 4 red", "1 green, 1 blue"]

    // We assume every game is possible:
    Boolean impossible_check = false;

    foreach (string set in game_result)
    {
        string[] rolls = set.Split(',');

        foreach (string roll in rolls)
        {
            int n_cubes = Convert.ToInt32(roll.Split(' ')[1]);
            string cube_color = roll.Split(' ')[2];

            switch (cube_color)
            {
                case "blue":
                    if (n_cubes > max_blue_cubes)
                    {
                        impossible_check = true;
                    }

                    break;
                case "green":
                    if (n_cubes > max_green_cubes)
                    {
                        impossible_check = true;
                    }
                    break;

                case "red":
                    if (n_cubes > max_red_cubes)
                    {
                        impossible_check = true;
                    }

                    break;

                default:
                    Console.WriteLine("WTF! Ningún color la verdad...");
                    break;
            }

        }


    }
    // Check if valid game: 

    if (true)
    {
        possible_games_ids_sum += game_id;

        // Count game maxes and make the matrix

        foreach (string element in lines[n_line].Split(':', ',', ';').Skip(1))
        {

            int n_cubes = Convert.ToInt32(element.Split(' ')[1]);
            string cube_color = element.Split(' ')[2];

            switch (cube_color)
            {
                case "blue":
                    if (n_cubes > lines_array[n_line, 0])
                    {
                        lines_array[n_line, 0] = n_cubes;
                    }

                    break;
                case "green":
                    if (n_cubes > lines_array[n_line, 1])
                    {
                        lines_array[n_line, 1] = n_cubes;
                    }
                    break;

                case "red":
                    if (n_cubes > lines_array[n_line, 2])
                    {
                        lines_array[n_line, 2] = n_cubes;
                    }
                    break;

                default:
                    break;
            }

        }
    }





    


}




// Go over the matrix, and multiple the minimum number of balls. 
int total_multiplied_number = 0;
for (int i = 0; i < lines_array.GetLength(0); i++)
{
    int multiplied_min_number_balls = lines_array[i, 0] * lines_array[i, 1] * lines_array[i, 2];
    total_multiplied_number += multiplied_min_number_balls;
}

// Output the matrix
for (int i = 0; i < lines_array.GetLength(0); i++)
{
    for (int j = 0; j < lines_array.GetLength(1); j++)
    {
        Console.Write(lines_array[i, j] + "\t");
    }
    Console.WriteLine();
}

Console.WriteLine($"Result Part 1: {possible_games_ids_sum}");
Console.WriteLine($"Result Part 2: {total_multiplied_number}");



