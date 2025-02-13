import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";

export default function CallToAction() {
  return (
    <div className="bg-gradient-to-r from-white via-indigo-50 to-white py-20 px-6 font-[sans-serif]">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">Join Us Today</h2>
        <p className="text-lg text-gray-900 mb-12">Experience the future of our innovative solutions. Sign up now for exclusive access.</p>
        <Button variant={"default"} className="bg-green-600 w-max mx-auto hover:bg-green-700">
          <Link to="/Subscriptions">
            Get started
          </Link>
        </Button>
      </div>
    </div>
  )
}
