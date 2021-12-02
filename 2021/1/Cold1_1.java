import java.io.*;

public class Cold1_1 {

    public static int depthsCheck(){
        BufferedReader previousBR = null;
        BufferedReader currentBR = null;
        int counter = 0;
        try {
            //
            //C:\Users\imabh\IdeaProjects\AdventOfCode012021\src\Main.java
            previousBR = new BufferedReader(new FileReader(new File("").getAbsolutePath() + "/src/input.txt"));
            currentBR = new BufferedReader(new FileReader(new File("").getAbsolutePath() + "/src/input.txt"));
            String previousLine = previousBR.readLine();
            String currentLine = currentBR.readLine();
            currentLine = currentBR.readLine();
            int previous = Integer.parseInt(previousLine);
            int current = Integer.parseInt(currentLine);
            while(currentLine != null){
                previous = Integer.parseInt(previousLine);
                current = Integer.parseInt(currentLine);
                if(current > previous){
                    counter++;
                }
                previousLine = previousBR.readLine();
                currentLine = currentBR.readLine();
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            return counter;
        }
    }
}
