package project10259;

import java.util.Arrays;
import java.util.Scanner;

public class TestsetA {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        // 1. Print values greater than 100
        int[] a = {2, 43, 66, 92, 3, 5, 13, 123, 432, 44, 78};
        int x = 100;
        System.out.println("Values greater than " + x + ":");
        for (int num : a) {
            if (num > x) {
                System.out.print(num + " ");
            }
        }

        System.out.println("\n");

        // 2. Find duplicate values
        int[] a1 = {1, 2, 3, 4, 2, 7, 8, 8, 3};
        System.out.println("Duplicate elements are:");
        for (int i = 0; i < a1.length; i++) {
            for (int j = i + 1; j < a1.length; j++) {
                if (a1[i] == a1[j]) {
                    System.out.println(a1[i]);
                    break;
                }
            }
        }

        System.out.println();

        // 3. Modify and Concatenate Three Words
        System.out.println("Enter three words:");
        String w1 = sc.nextLine();
        String w2 = sc.nextLine();
        String w3 = sc.nextLine();

        w1 = w1.replaceAll("[aeiouAEIOU]", "*");
        w2 = w2.replaceAll("[^aeiouAEIOU]", "@");
        w3 = w3.toUpperCase();

        System.out.println("Modified and concatenated result:");
        System.out.println(w1 + w2 + w3);

        System.out.println();

        // 4. Check if Two Strings Are Anagrams
        String s1 = "Ramu".toLowerCase().replaceAll("\\s", "");
        String s2 = "umar".toLowerCase().replaceAll("\\s", "");

        char[] a2 = s1.toCharArray();
        char[] a3 = s2.toCharArray();
        Arrays.sort(a2);
        Arrays.sort(a3);

        System.out.println(Arrays.equals(a2, a3) ? "Anagram" : "Not Anagram");

        System.out.println();

        // 5. Simple Calculator
        System.out.println("Enter two numbers and an operator (+, -, *, /):");
        int a4 = sc.nextInt();
        int b = sc.nextInt();
        char op = sc.next().charAt(0);

        switch (op) {
            case '+': System.out.println(a4 + b); break;
            case '-': System.out.println(a4 - b); break;
            case '*': System.out.println(a4 * b); break;
            case '/': System.out.println(b != 0 ? a4 / b : "Cannot divide by zero"); break;
            default: System.out.println("Invalid operator");
        }

        System.out.println();

        // 6. Display Grade Based on Average
        int avg = 80;
        if (avg >= 80) System.out.println("Grade A");
        else if (avg >= 60) System.out.println("Grade B");
        else if (avg >= 40) System.out.println("Grade C");
        else System.out.println("Grade D");

        System.out.println();

        // 7. Check Eligibility for Physical Test
        System.out.println("Enter height and weight:");
        double height = sc.nextDouble();
        double weight = sc.nextDouble();

        if (height >= 5.5 && weight > 55)
            System.out.println("Eligible for physical test");
        else
            System.out.println("Not eligible");

        System.out.println();

        // 8. Check Vowel or Consonant
        System.out.println("Enter a character:");
        char ch = sc.next().toLowerCase().charAt(0);
        if ("aeiou".indexOf(ch) != -1)
            System.out.println("Vowel");
        else if (Character.isLetter(ch))
            System.out.println("Consonant");
        else
            System.out.println("Not a valid alphabet");

        System.out.println();

        // 9. Conditional Actions Based on Integer n
        System.out.println("Enter an integer:");
        int n = sc.nextInt();
        if (n % 2 == 1) System.out.println("Weird");
        else if (n >= 2 && n <= 5) System.out.println("Not Weird");
        else if (n >= 6 && n <= 20) System.out.println("Weird");
        else System.out.println("Not Weird");

        sc.close();
    }
}

