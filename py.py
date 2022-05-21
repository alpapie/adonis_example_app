class User:
    def __init__(self, first_name, last_name, age, location):
        self.first_name = first_name
        self.last_name = last_name
        self.age = age
        self.location = location
    def describe_user(self):
        print("\nFirst Name: " + self.first_name+"\nLast Name: " + self.last_name+"\nAge: " + str(self.age)+"\nLocation: " + self.location)
s=User('Sara','Hussein',25,'Egypt')
print(s.describe_user()) 