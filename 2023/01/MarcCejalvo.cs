using System;
using System.Linq;
using System.IO;
using System.Xml.Schema;

string[] original_lines = File.ReadLines("input-01").ToArray();

string[] lines = File.ReadLines("input-01").ToArray();

// #2 Brute Force, all loop

// Converting strings to numbers
Dictionary<string, int> stringToNumberMap = new Dictionary<string, int>();

// Combinations
stringToNumberMap["twone"] = 21; // XDD
stringToNumberMap["oneight"] = 18;
stringToNumberMap["eightwo"] = 82;
stringToNumberMap["eighthree"] = 83;

stringToNumberMap["one"] = 1;
stringToNumberMap["two"] = 2;
stringToNumberMap["three"] = 3;
stringToNumberMap["four"] = 4;
stringToNumberMap["five"] = 5;
stringToNumberMap["six"] = 6;
stringToNumberMap["seven"] = 7;
stringToNumberMap["eight"] = 8;
stringToNumberMap["nine"] = 9;

// Check if key exists:

for (int i = 0; i < lines.Length; i++)
{
  foreach (KeyValuePair<string, int> entry in stringToNumberMap)
  {
    string keyToCheck = entry.Key;

    if (lines[i].Contains(keyToCheck))
    {
      // Console.WriteLine($"{lines[i]}");
      lines[i] = lines[i].Replace(entry.Key, entry.Value.ToString());
      // Console.WriteLine($"{lines[i]}");

    }
  }
}

// Extracting the numbers
var numbers = lines
    .Select(str => new string(str.Where(char.IsDigit).ToArray())) // Extract numbers from each string
    .Where(str => !string.IsNullOrEmpty(str)) // Filter out empty strings
    .ToArray();


// Summing first and last digit only
int total = 0;
int count = 0;

foreach (string number in numbers)
{
  int number_to_sum = 0;
  if (number.Length > 1)
  {
    char first_digit = number[0];
    char second_digit = number[number.Length - 1];
    string number_in_string = first_digit.ToString() + second_digit.ToString();
    number_to_sum = Convert.ToInt32(number_in_string);
  }

  else
  {
    number_to_sum = Convert.ToInt32(number + number);
  }

  Console.WriteLine($"Original line: {original_lines[count]}, Mapped line: {lines[count]}, Number to sum: {number_to_sum}");
  total += number_to_sum;

  count++;
}

Console.WriteLine("Total: " + total);