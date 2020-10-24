import java.util.Scanner;
import java.util.Random;
public class OddsandEvens {

	public static void main(String[] args) {
		while(true) {
		Scanner system = new Scanner(System.in);
		System.out.println("Welcome to Odds and Evens, a new basic game for you to play!!!");
		System.out.println("Please enter your player name:");
		String name = system.nextLine();
		System.out.println("Welcome " + name + " to Odds and Evens, your opponent will be the computer.");
		System.out.println("For this game, all you have to do is declare Odds or Evens, and then you choose a number from 0-5 and the computer chooses a number from 1-5. If the sum of both your fingers is either Odds or Evens(the one you choosed), then you win, otherwise the computer wins. ");
		System.out.println("<Starting Game>");
		Game();
		System.out.println("Thanks for playing " + name + ". Hopefully you enjoyed playing Odds and Evens.");
		test();
	}
	}
	public static void Game() {
		Scanner read = new Scanner(System.in);
		Random rand = new Random();
		System.out.println("So which do you choose, Odds or Evens(O/E)?");
		String Choice = read.nextLine();
		if(Character.toLowerCase(Choice.charAt(0)) == 'o') {
			System.out.println("You picked: ODDS, so the computer will be EVENS.");
		}else if(Character.toLowerCase(Choice.charAt(0)) == 'e') {
			System.out.println("You picked: EVENS, so the computer picked ODDS.");
		}else {
			System.out.println("You did not enter a valid answer, please play the game again.");
			test();
		}
		System.out.println("So for this game, you have to choose a number from 0-5, and the computer will also choose a random number and you have to see whether the sum of both your numbers is either Odds or Evens.");
		System.out.println("So what number do you choose?");
		int input = read.nextInt();
		System.out.println(" ");
		if(input >= 0 && input <= 5 ) {
		int computer = rand.nextInt(6);
		System.out.println("Ok so you chose: " + input);
		System.out.println("And the computer chose: " + computer);
		int sum = input + computer;
		System.out.println("So " + input + "(Your Number)" + " + " + computer +" = " + sum);
		if(sum % 2 == 0) {
			System.out.println(sum + " is.... EVEN!");		
		}else{
			if(sum == 0) {
				System.out.println("That means its a tie game.");
				test();
			}else if(sum %2 != 0) {
				System.out.println(sum + " is..... ODD!");
			}
			sum(sum,Choice);
		}
		}else if(input < 0 || input > 5) {
			System.out.println("Ensure that you entered an integer that is from 0-5.");
			test();
		}
	}
public static void sum(int sum, String Choice) {
		boolean OorE = sum %2 == 0;
		if(OorE == false && Character.toLowerCase(Choice.charAt(0)) == 'e') {
			System.out.println("That means that the computer wins");
		}else if(OorE == true && Character.toLowerCase(Choice.charAt(0)) == 'o'){ 
			System.out.println("The Computer wins :(");
		
		}else {
			System.out.println("That means you win!!! Congratulations!!!");
		}

	}
	public static void test() {
		Scanner readme = new Scanner(System.in);
		System.out.println("Would you like to play again?(Y/N)");
		String answer = readme.nextLine();
		if(Character.toLowerCase(answer.charAt(0)) == 'n') {
			System.out.println("Ok, Thank you for playing this game.");
			System.out.println("<Exiting Program>");
			System.exit(0);
		}else if(Character.toLowerCase(answer.charAt(0)) != 'n' && Character.toLowerCase(answer.charAt(0)) !='y') {
			System.out.println("Please enter a valid response.");
			test();
		}
	}
}

