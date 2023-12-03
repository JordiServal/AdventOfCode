using System.Linq;
using System;
using System.IO;
using System.Xml.Schema;
using System.Text.RegularExpressions;

string[] input = File.ReadLines("/home/mono/RiderProjects/AdventOfCode/input").ToArray();
string input_text = File.ReadAllText("/home/mono/RiderProjects/AdventOfCode/input");

// Gather all special characters
var matches = Regex.Matches(input_text, "[^a-zA-Z0-9_.]+");
    
List<Coordinate> numbersList = new List<Coordinate>();
string specialCharacters = "";
foreach (Match match in matches)
{
    char match_to_compare = match.Value[0]; 
    if (!specialCharacters.Contains(match_to_compare))
    {
        specialCharacters += match_to_compare;
    }
    
}



// Transform input into a matrix: 
int x = input.Length;
int y = input[0].Length;
Console.WriteLine($"Matrix Size: {y}x{x}");
char[,] inputMatrix = new char[x,y];

for (int i = 0; i < x; i++)
{
    for (int j=0; j < y; j++)
    {
        inputMatrix[i, j] = input[i][j];
    }
}

// Part 1
string possiblePartNumber = "";
int partNumberTotal = 0;
List<int> partNumberList = new List<int>();  
Boolean success = false;

int previous_i = 0; 
int previous_j = 0; 
for (int i = 0; i < x; i++)
{
    
    for (int j=0; j < y; j++)
    {
        char character = inputMatrix[i, j];
        if (Char.IsDigit(character))
        {
            possiblePartNumber += character;
            previous_i = i;
            previous_j = j;
        }

        else
        {
            if (possiblePartNumber.Length > 0) // Number found
            {
                // New number found, we assume is not a enginePart
                success = false;
                int partNumber = Convert.ToInt32(possiblePartNumber);
                int numberLength = possiblePartNumber.Length;
                int row = previous_i;
                int column = previous_j;
                var newNumber = new Coordinate();
                newNumber.value = partNumber;
                newNumber.x = previous_i;
                newNumber.y = previous_j;
                newNumber.length = possiblePartNumber.Length;
                numbersList.Add(newNumber);
                possiblePartNumber = "";
                
                // Check if adjacent symbols 
                
                
                for (int ii = row - 1; ii <= row + 1; ii++)
                {
                    for (int jj = column - numberLength; jj <= column + 1; jj++)
                    {
                        try
                        {
                            // Console.WriteLine(
                            //     $"row: {row + 1}, column: {column + 1}, ii: {ii + 1}, jj: {jj + 1}, char: {input_matrix[ii, jj]}, partNumber: {partNumber}");
                            if (specialCharacters.Contains(inputMatrix[ii, jj]))
                            {
                                // Console.WriteLine("És valid!");
                                success = true;
                                
                            }
                        }

                        catch
                        {
                            // Console.WriteLine("Fuera de límite");
                            continue;
                        }
                    }
                    
                    if (success)
                    {
                        partNumberList.Add(partNumber);
                        partNumberTotal += partNumber;
                        break;
                    }
                }
                            }
        }
    }
}

Console.WriteLine($"Result Part 1: {partNumberTotal}");
var possibleGears = new List<Coordinate>();


// List of possible Gears
for (int i = 0; i < x; i++)
{
    for (int j = 0; j < y; j++)
    {
        char character = inputMatrix[i, j];
        if (character == '*')
        {
            var newPossibleGearFound = new Coordinate();
            newPossibleGearFound.x = i;
            newPossibleGearFound.y = j;
            possibleGears.Add(newPossibleGearFound);
        }
    }
}

// Check if adjacent numbers exist to gears: 
int totalProduct = 0;
foreach (var gear in possibleGears)
{
    Console.WriteLine($"------ New Gear ({gear.x},{gear.y}) --------- ");
    var potentialNumbers = getCloseNumbers(gear);
    
    foreach (var number in potentialNumbers)
    {
        Console.WriteLine(number);
    }

    if (potentialNumbers.Count > 1)
    {
        int gearRatio = potentialNumbers[0] * potentialNumbers[1];
        totalProduct += gearRatio;
    }
}

Console.WriteLine($"\n Part 2 Result: {totalProduct}");

List<int> getCloseNumbers(Coordinate possibleGear)
{
    List<int> potentialAdjacentNumbers = new List<int>();
    string possiblePartNumber = "";
    var surroundings = GetGearSurroundings(possibleGear);

    foreach (var surrounding in surroundings)
    {
        foreach (var number in numbersList)
        {
            for (int j = number.y - number.length + 1; j <=  number.y; j++)
            {
                if (surrounding.x == number.x && surrounding.y == j)
                {
                    potentialAdjacentNumbers.Add(number.value);
                }
            }
        }
    }

    return potentialAdjacentNumbers.Distinct().ToList();
}

static List<Coordinate> GetGearSurroundings(Coordinate possibleGear)
{
    var gearSurroundings = new List<Coordinate>();
    int gearX = possibleGear.x;
    int gearY = possibleGear.y;
    for (int i = gearX - 1; i <= gearX + 1; i++)
    {
        for (int j = gearY - 1; j <= gearY + 1; j++)
        {
            if (i != gearX | j != gearY)
            {
                var newSurroundingPoint = new Coordinate();
                newSurroundingPoint.x = i;
                newSurroundingPoint.y = j;

                gearSurroundings.Add(newSurroundingPoint);
            }
        }
    }

    return gearSurroundings;
}


class Coordinate
{
    public int value;
    public int length;
    public int x;
    public int y;
}