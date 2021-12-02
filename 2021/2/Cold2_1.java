import java.io.*;

public class Cold2_1 {

    public static int depthsCheck(){
        BufferedReader br = null;
        int horizontal = 0;
        int vertical = 0;
        try {
            //
            br = new BufferedReader(new FileReader(new File("").getAbsolutePath() + "/src/input.txt"));
            String line = br.readLine();
            String[] splits;
            String word;
            int aux;
            while(line != null){
                splits = line.split(" ");
                word = splits[0];
                aux = Integer.parseInt(splits[1]);
                switch (word){
                    case "forward":
                        horizontal += aux;
                        break;
                    case "up":
                        vertical -= aux;
                        break;
                    case "down":
                        vertical += aux;
                        break;
                }
                line = br.readLine();
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {

            return horizontal*vertical;
        }
    }
}

