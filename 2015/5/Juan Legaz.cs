   
namespace ConsoleApp1 {
    class Program {
        static void Main(string[] args) {
            c2015e5p1();
            c2015e5p2();
        }
        public static void c2015e5p1() {

            List<string> bannedChars = new List<string>() { "ab", "cd", "pq", "xy" };
            List<char> vowels = new List<char>() { 'a', 'e', 'i', 'o', 'u' };
            List<string> lines = File.ReadAllLines("E:/Input.txt").ToList();

            int valid = 0;
            foreach (string line in lines) {
                bool banned = false;
                int vowelCount = 0;
                bool repeatedLetter = false;
                for (int i = 0; i < line.Length; i++) {
                    if (vowels.Contains(line[i])) {
                        vowelCount++;
                    }

                    if (i != line.Length - 1) {
                        bannedChars.ForEach(x => banned |= line[i] == x[0] && line[i + 1] == x[1]);
                        if (banned) {
                            break;
                        }

                        if (!repeatedLetter && line[i] == line[i + 1]) {
                            repeatedLetter = true;
                        }
                    }
                }

                if (!banned && repeatedLetter && vowelCount >= 3) {
                    valid++;
                }
            }

            Console.WriteLine(valid);

        }

        public static void c2015e5p2() {
            List<string> lines = File.ReadAllLines("E:/Input.txt").ToList();

            int valid = 0;
            foreach (string line in lines) {
                bool repeats = false;
                bool inbetween = false;
                
                for (int i = 0; i <= line.Length - 3; i++) {                    
                    if (!repeats && i != line.Length - 3) {
                        for (int j = i + 2; j < line.Length - 1; j++) {
                            repeats |= line[i] == line[j] && line[i + 1] == line[j + 1];
                            if (repeats) {
                                break;
                            }
                        }
                    }

                    if(!inbetween) {
                        inbetween |= line[i] == line[i + 2];
                    }
                }

                if (repeats && inbetween) {
                    valid++;
                }
            }

            Console.WriteLine(valid);
        }
    }
}
