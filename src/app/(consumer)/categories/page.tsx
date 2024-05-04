import { Card, CardContent } from "@/components/ui/card";

export default function Categories() {
  return (
    <div className="mb-5">
      <div className="bg-primary mb-4">
        <div className="container h-[200px]">
          <div className="flex justify-center items-center h-full">
            <h1 className="text-white">Explore the catalog</h1>
          </div>
        </div>
      </div>
      <div className="container py-3 lg:py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <Card className="shadow-none">
              <CardContent className="p-4 text-center">
                <h4 className="text-primary mb-1">AWS</h4>
                <div className="text-gray-500">30 Courses</div>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="shadow-none">
              <CardContent className="p-4 text-center">
                <h4 className="text-primary mb-1">Java</h4>
                <div className="text-gray-500">30 Courses</div>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="shadow-none">
              <CardContent className="p-4 text-center">
                <h4 className="text-primary mb-1">DevOps</h4>
                <div className="text-gray-500">30 Courses</div>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="shadow-none">
              <CardContent className="p-4 text-center">
                <h4 className="text-primary mb-1">React</h4>
                <div className="text-gray-500">30 Courses</div>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="shadow-none">
              <CardContent className="p-4 text-center">
                <h4 className="text-primary mb-1">Android</h4>
                <div className="text-gray-500">30 Courses</div>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="shadow-none">
              <CardContent className="p-4 text-center">
                <h4 className="text-primary mb-1">Swift</h4>
                <div className="text-gray-500">30 Courses</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
