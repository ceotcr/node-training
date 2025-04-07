const randomName = () => {
    const names = ['Alice', 'Bob', 'Charlie', 'Daisy', 'Ethan', 'Fiona', 'George', 'Hannah', 'Ian', 'Jasmine', 'Kevin', 'Lilly', 'Max', 'Nina', 'Oscar', 'Paula', 'Quincy', 'Rachel', 'Sam', 'Tina', 'Uma', 'Victor', 'Wendy', 'Xavier', 'Yara', 'Zack'];
    return names[Math.floor(Math.random() * names.length)] + Math.floor(Math.random() * 100);
};

const randomSubject = () => {
    const subjects = ['Math', 'Science', 'English', 'History', 'Geography', 'Art', 'Music', 'PE', 'Computer', 'Economics'];
    return subjects[Math.floor(Math.random() * subjects.length)];
};

const randomScore = () => Math.floor(Math.random() * 71) + 30;

class Student {
    constructor(name) {
        this.name = name;
        this.grades = [];
    }

    addGrade(grade) {
        this.grades.push(grade);
    }

    averageGrade() {
        if (this.grades.length === 0) return 0;
        return this.grades.reduce((sum, g) => sum + g.score, 0) / this.grades.length;
    }
}

class Teacher {
    constructor(name, subject) {
        this.name = name;
        this.subject = subject;
        this.classes = [];
    }

    addClass(classroom) {
        this.classes.push(classroom);
    }

    getStudents() {
        return this.classes.flatMap(c => c.students);
    }

    averageStudentGrade() {
        const students = this.getStudents();
        if (students.length === 0) return 0;
        const allGrades = students.flatMap(s => s.grades);
        if (allGrades.length === 0) return 0;
        return allGrades.reduce((sum, g) => sum + g.score, 0) / allGrades.length;
    }
}

class Classroom {
    constructor(name) {
        this.name = name;
        this.teacher = null;
        this.students = [];
    }

    assignTeacher(teacher) {
        this.teacher = teacher;
        teacher.addClass(this);
    }

    addStudent(student) {
        this.students.push(student);
    }
}

class Grade {
    constructor(student, subject, score) {
        this.student = student;
        this.subject = subject;
        this.score = score;
    }
}

const teachers = Array.from({ length: 5 }, () => new Teacher(randomName(), randomSubject()));
const classes = Array.from({ length: 10 }, (_, i) => new Classroom(`Class-${i + 1}`));
const students = Array.from({ length: 30 }, () => new Student(randomName()));

classes.forEach(classroom => {
    const randomTeacher = teachers[Math.floor(Math.random() * teachers.length)];
    classroom.assignTeacher(randomTeacher);
});

students.forEach(student => {
    const randomClass = classes[Math.floor(Math.random() * classes.length)];
    randomClass.addStudent(student);
});

students.forEach(student => {
    const subjects = ['Math', 'Science', 'English'];
    subjects.forEach(subject => {
        const score = randomScore();
        const grade = new Grade(student, subject, score);
        student.addGrade(grade);
    });
});


const top5 = [...students]
    .sort((a, b) => b.averageGrade() - a.averageGrade())
    .slice(0, 5);

console.log('\n🏆 Top 5 Students by Average Grade:');
top5.forEach((s, i) => {
    console.log(`${i + 1}. ${s.name} - Avg: ${s.averageGrade().toFixed(2)}`);
});

const bestTeacher = teachers.reduce((best, t) =>
    t.averageStudentGrade() > best.averageStudentGrade() ? t : best
);

console.log(`\n👨‍🏫 Best Teacher: ${bestTeacher.name} (${bestTeacher.subject}) - Avg Student Grade: ${bestTeacher.averageStudentGrade().toFixed(2)}`);

console.log('\n🏫 Classes and Student Performance:');
classes.forEach(classroom => {
    console.log(`\n📚 ${classroom.name} - Teacher: ${classroom.teacher.name}`);
    if (classroom.students.length === 0) {
        console.log("   No students enrolled.");
    } else {
        classroom.students.forEach(s => {
            console.log(`   - ${s.name} | Avg Grade: ${s.averageGrade().toFixed(2)}`);
        });
    }
});

/*

*/