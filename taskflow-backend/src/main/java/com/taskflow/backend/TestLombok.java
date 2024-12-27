package com.taskflow.backend;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TestLombok {
    private String name;
    private int age;

    public static void main(String[] args) {
        TestLombok test = new TestLombok();
        test.setName("TaskFlow");
        test.setAge(42);

        System.out.println(test.getName()); // Ar trebui să printeze "TaskFlow"
        System.out.println(test.getAge());  // Ar trebui să printeze 42
        System.out.println(test);           // Ar trebui să printeze TestLombok(name=TaskFlow, age=42)
    }
}