package project10259;

import java.time.LocalDate;
import java.time.Period;
import java.util.Arrays;

public class TestsetB {

    // 1. Employee and Subclasses
    static class Employee {
        String name;
        double salary;
        LocalDate hireDate;

        Employee(String name, double salary, LocalDate hireDate) {
            this.name = name;
            this.salary = salary;
            this.hireDate = hireDate;
        }

        int getYearsOfService() {
            return Period.between(hireDate, LocalDate.now()).getYears();
        }
    }

    static class TemporaryEmployee extends Employee {
        TemporaryEmployee(String name, double salary, LocalDate hireDate) {
            super(name, salary, hireDate);
        }
    }

    static class PermanentEmployee extends Employee {
        PermanentEmployee(String name, double salary, LocalDate hireDate) {
            super(name, salary, hireDate);
        }
    }

    // 2. TrafficLight Class
    static class TrafficLight {
        String color;
        int duration;

        TrafficLight(String color, int duration) {
            this.color = color;
            this.duration = duration;
        }

        void changeColor(String newColor) {
            color = newColor;
        }

        boolean isRed() {
            return color.equalsIgnoreCase("red");
        }

        boolean isGreen() {
            return color.equalsIgnoreCase("green");
        }
    }

    public static void main(String[] args) {

        // 3. Even Length Words
        System.out.println("Even length words:");
        String s = "i am Geeks for Geeks and a Geek";
        for (String word : s.split(" ")) {
            if (word.length() % 2 == 0) {
                System.out.println(word);
            }
        }

        // 4. Swap Pairs
        System.out.println("\nSwapped pairs:");
        String str = "Java";
        char[] chars = str.toCharArray();
        for (int i = 0; i < chars.length - 1; i += 2) {
            char temp = chars[i];
            chars[i] = chars[i + 1];
            chars[i + 1] = temp;
        }
        System.out.println(new String(chars));

        // 5. Replace Character
        System.out.println("\nReplace character:");
        String original = "Geeks Gor Geeks";
        int index = 6;
        char ch = 'F';
        String result = original.substring(0, index) + ch + original.substring(index + 1);
        System.out.println(result);

        // 6. Rotate Array
        System.out.println("\nRotated array:");
        int[] arr = {1, 2, 3, 4, 5, 6};
        int d = 2;
        int n = arr.length;
        d = d % n;
        int[] rotated = new int[n];
        for (int i = 0; i < n; i++) {
            rotated[i] = arr[(i + d) % n];
        }
        System.out.println(Arrays.toString(rotated));

        // 7. Move Zeros
        System.out.println("\nMove zeros:");
        int[] arr2 = {1, 2, 0, 4, 3, 0, 5, 0};
        int index2 = 0;
        for (int num : arr2) {
            if (num != 0) {
                arr2[index2++] = num;
            }
        }
        while (index2 < arr2.length) {
            arr2[index2++] = 0;
        }
        System.out.println(Arrays.toString(arr2));

        // 8. Min and Max
        System.out.println("\nMin and Max:");
        int[] arr3 = {10, 5, 20, 8, 3};
        int min = arr3[0], max = arr3[0];
        for (int num : arr3) {
            if (num < min) min = num;
            if (num > max) max = num;
        }
        System.out.println("Min: " + min);
        System.out.println("Max: " + max);
    }
}

