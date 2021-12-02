import java.io.*;

public class Cold1_2 {

    public static int depthWindowCheck(){
        BufferedReader firstBR = null;
        BufferedReader secondBR = null;
        BufferedReader thirdBR = null;
        BufferedReader fourthBR = null;
        int counter = 0;
        try {
            //
            //C:\Users\imabh\IdeaProjects\AdventOfCode012021\src\Main.java
            firstBR = new BufferedReader(new FileReader(new File("").getAbsolutePath() + "/src/input.txt"));
            secondBR = new BufferedReader(new FileReader(new File("").getAbsolutePath() + "/src/input.txt"));
            thirdBR = new BufferedReader(new FileReader(new File("").getAbsolutePath() + "/src/input.txt"));
            fourthBR = new BufferedReader(new FileReader(new File("").getAbsolutePath() + "/src/input.txt"));

            String firstLine = firstBR.readLine();
            String secondLine = secondBR.readLine();
            secondLine = secondBR.readLine();
            String thirdLine = thirdBR.readLine();
            thirdLine = thirdBR.readLine();
            thirdLine = thirdBR.readLine();
            String fourthLine = fourthBR.readLine();
            fourthLine = fourthBR.readLine();
            fourthLine = fourthBR.readLine();
            fourthLine = fourthBR.readLine();

            int first = Integer.parseInt(firstLine);
            int second = Integer.parseInt(secondLine);
            int third = Integer.parseInt(thirdLine);
            int fourth = Integer.parseInt(fourthLine);

            int firstWindow = 0;
            int secondWindow = 0;

            while(fourthLine != null){
                first = Integer.parseInt(firstLine);
                second = Integer.parseInt(secondLine);
                third = Integer.parseInt(thirdLine);
                fourth = Integer.parseInt(fourthLine);
                firstWindow = first + second + third;
                secondWindow = second + third + fourth;

                if(secondWindow > firstWindow){
                    counter++;
                }
                firstLine = firstBR.readLine();
                secondLine = secondBR.readLine();
                thirdLine = thirdBR.readLine();
                fourthLine = fourthBR.readLine();
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
