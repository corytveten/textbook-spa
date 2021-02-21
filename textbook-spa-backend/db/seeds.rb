# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


school_a = School.create(name: 'University of Pittsburgh')
school_b = School.create(name: 'Community College of Allegheny County')
school_c = School.create(name: 'South University')
school_d = School.create(name: 'Midlands Technical College')

course_a = Course.create(code: 'PSY101', title: "General Psychology", school: school_a)
course_b = Course.create(code: 'ENG101', title: "English Composition", school: school_b)
course_c = Course.create(code: 'MAT1001', title: "Intermediate Algebra", school: school_c)
course_d = Course.create(code: "BIO140", title: "Anatomy & Physiology I", school: school_d)
course_e = Course.create(code: 'ENG1100', title: 'English Composition', school: school_c)


textbook_a = Textbook.create(title: 'Psychology', author: "Brown", edition: "first", course: course_a)
textbook_b = Textbook.create(title: 'Academic Writing', author: "Black", edition: "first", course: course_b)
textbook_c = Textbook.create(title: 'Intermediate Algebra', author: 'White', edition: 'fourth', course: course_c)
textbook_d = Textbook.create(title: 'Anatomy & Physiology', author: 'Smith', edition: 'second', course: course_d)