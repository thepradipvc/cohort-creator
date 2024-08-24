import { useNavigate } from "react-router-dom";
import useDummyData from "@/hooks/useDummyData";
import { getAllCohorts, removeCohort } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ExternalLinkIcon,
  Pencil2Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { v4 as uuidv4 } from "uuid";

const Cohorts = () => {
  useDummyData();
  const cohorts = getAllCohorts();
  const navigate = useNavigate();

  const loadDummyData = () => {
    const dummyData = localStorage.getItem("dummy-data");
    if (dummyData) {
      localStorage.setItem("cohorts", dummyData);
      navigate(0);
    }
  };

  const createCohort = () => {
    navigate(`/cohorts/${uuidv4()}`);
  };

  return (
    <main className="grid space-y-8 p-8">
      <h1 className="text-3xl font-bold">Cohorts</h1>
      <div className="flex gap-4">
        <Button onClick={createCohort} className="w-max">
          Create new cohort
        </Button>
        <Button onClick={loadDummyData} className="w-max">
          Load / Reset dummy data
        </Button>
      </div>
      <div className="grid gap-4">
        {Object.entries(cohorts).map(([id, cohort]) => (
          <div
            key={id}
            className="flex items-center gap-12 rounded-md border border-gray-300 p-2"
          >
            <Link to={`/cohorts/${id}`} className="flex-1">
              <div>
                <h2 className="text-xl font-bold">{cohort.title}</h2>
                <p>{cohort.description}</p>
              </div>
            </Link>
            <div className="flex gap-2">
              <Button size="icon" variant="outline" asChild>
                <Link to={`/cohorts/preview/${id}`} target="_blank">
                  <ExternalLinkIcon />
                </Link>
              </Button>
              <Button size="icon" variant="secondary" asChild>
                <Link to={`/cohorts/${id}`}>
                  <Pencil2Icon />
                </Link>
              </Button>
              <Button
                size="icon"
                variant="destructive"
                onClick={() => {
                  removeCohort(id);
                  navigate(0);
                }}
              >
                <TrashIcon />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Cohorts;
