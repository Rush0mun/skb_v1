import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// This would typically come from your database
const members = [
  {
    id: 1,
    name: "Md. Kamal Hossain",
    belt: "Black Belt (3rd Dan)",
    joinDate: "2018",
    achievements: "National Champion 2022",
  },
  {
    id: 2,
    name: "Fatima Rahman",
    belt: "Black Belt (1st Dan)",
    joinDate: "2020",
    achievements: "Regional Gold Medalist",
  },
  // Add more sample members
];

export default function MembersPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Our Members</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <Card key={member.id}>
            <CardHeader>
              <CardTitle>{member.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>Belt:</strong> {member.belt}</p>
                <p><strong>Joined:</strong> {member.joinDate}</p>
                <p><strong>Achievements:</strong> {member.achievements}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}