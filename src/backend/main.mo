import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Iter "mo:core/Iter";

actor {
  public type Student = {
    id : Nat;
    name : Text;
    pin : Nat;
    fees : [Bool]; // 12 months; true = paid
  };

  var nextId = 1;

  func start() : Student {
    {
      id = nextId;
      name = ""; // empty because unused anyway through start()
      pin = 0;
      fees = Array.tabulate<Bool>(12, func(_) { false });
    };
  };
  let students = Map.empty<Nat, Student>();

  public shared ({ caller }) func createStudent(name : Text, pin : Nat) : async Nat {
    let id = nextId;

    let student : Student = {
      id;
      name;
      pin;
      fees = Array.tabulate<Bool>(12, func(_) { false });
    };

    students.add(id, student);
    nextId += 1;
    id;
  };

  // Student login with PIN
  public query ({ caller }) func loginStudent(id : Nat, pin : Nat) : async Bool {
    switch (students.get(id)) {
      case (null) { false };
      case (?student) {
        student.pin == pin;
      };
    };
  };

  // Update fee status for a specific month (0 = Jan, 11 = Dec)
  public shared ({ caller }) func markFeePaid(id : Nat, month : Nat, paid : Bool) : async () {
    switch (students.get(id)) {
      case (null) { Runtime.trap("Student with id " # id.toText() # " not found!") };
      case (?student) {
        if (month >= 12) {
          Runtime.trap("Invalid month!");
        };
        var newFees = Array.tabulate(12, func(i) { if (i == month) { paid } else { student.fees[i] } });
        let updatedStudent : Student = { student with fees = newFees };
        students.add(id, updatedStudent);
      };
    };
  };

  // Get fee status for a student
  public query ({ caller }) func getStudent(id : Nat) : async ?Student {
    students.get(id);
  };

  public query ({ caller }) func getStudents() : async [Student] {
    students.values().toArray();
  };

  public query ({ caller }) func getAllFees() : async [(Nat, [Bool])] {
    students.toArray().map(func((id, student)) { (id, student.fees) });
  };
};
