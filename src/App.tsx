import React, { useState, useEffect } from 'react';
import KanbanBoard from './components/KanbanBoard';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from './components/ui/sheet';
import Loader from './components/Loader';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Menu } from 'lucide-react';

type WorkOrder = {
  id: number;
  description: string;
  status: {
    id: number;
    description: string;
    code: string;
    editGroups: { label: string }[];
    systemStatus: { label: string; value: string };
    nextIds: number[];
  }[];
};

const App = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [isWorkOrdersLoading, setIsWorkOrdersLoading] = useState(false);
  const [isWorkOrdersFetched, setIsWorkOrdersFetched] = useState(false);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState<WorkOrder | null>(null);

  useEffect(() => {
    fetchData();
    fetchWorkOrders();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/data.json');
      const jsonData = await response.json();
      setData(jsonData[0].status);
      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const fetchWorkOrders = async () => {
    setIsWorkOrdersLoading(true);
    try {
      const response = await fetch('/data.json');
      const data: WorkOrder[] = await response.json();
      setWorkOrders(data);
      setIsWorkOrdersFetched(true);
    } catch (error) {
      console.error('Error fetching work orders:', error);
    } finally {
      setIsWorkOrdersLoading(false);
    }
  };

  const handleSelectWorkOrder = (workOrder: WorkOrder) => {
    setSelectedWorkOrder(workOrder);
    const formattedData = workOrder.status.map((status) => ({
      code: status.code,
      description: status.description,
      systemStatus: status.systemStatus,
      nextIds: status.nextIds.map((id) => id.toString()),
    }));
    setData(formattedData);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto p-2">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-white shadow-md flex items-center justify-between px-4 py-2">
        <h1 className="text-2xl font-semibold">Kanban Board</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" onClick={fetchWorkOrders}>
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent className="p-6 max-w-sm">
            <SheetHeader>
              <SheetTitle>Work Orders</SheetTitle>
            </SheetHeader>

            <div className="mt-4">
              {isWorkOrdersLoading && <Loader />}
              {isWorkOrdersFetched && workOrders.length > 0 ? (
                <div className="h-full max-h-screen overflow-y-auto">
                  <ul>
                    {workOrders.map((order) => (
                      <li
                        key={order.id}
                        onClick={() => handleSelectWorkOrder(order)}
                        className={`cursor-pointer p-3 rounded-md hover:bg-gray-200 transition-colors ${
                          selectedWorkOrder?.id === order.id ? 'bg-gray-300' : ''
                        } flex flex-col`}
                      >
                        <span className="flex-grow">{order.description}</span>
                        <Badge variant="secondary" className="mt-auto">
                          {order.status[0]?.systemStatus?.label || 'No Status Available'}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                !isWorkOrdersLoading && <p>No work orders available.</p>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Content below the fixed header */}
      <div className="mt-14 flex flex-col md:flex-row gap-2 p-4">
        <div className="flex-1">
          <KanbanBoard data={data} />
        </div>
      </div>
    </div>
  );
};

export default App;
