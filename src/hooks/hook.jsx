import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useErrors = (errors = []) => {
  useEffect(() => {
    errors.forEach(({ isError, error, fallback }) => {
      if (isError) {
        if (fallback) fallback();
        else toast.error(error?.data?.message || "An Error Encountered");
      }
    });
  }, [errors]);
};

const useAsyncMutation = (mutationHook) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const [mutate] = mutationHook();

  const executeMutation = async (toastMessage, ...args) => {
    setIsLoading(true);
    const toastId = toast.loading(toastMessage || "Updating data");

    try {
      const resp = await mutate(...args);
      if (resp.data) {
        toast.success(resp.data.message || "Data Updated", { id: toastId });
        setData(resp.data);
      } else {
        toast.error(resp?.error?.data?.message || "something went wrong", {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error("unable to send friend request");
      toast.error("something went wrong", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };
  return [executeMutation, isLoading, data];
};

const useSocketEvents = (socket, handlers) => {
  useEffect(() => {
    Object.entries(handlers).forEach(([event, handler]) => {
      socket.on(event, handler);
    });

    return () => {
      Object.entries(handlers).forEach(([event, handler]) => {
        socket.off(event, handler);
      });
    };
  }, [socket, handlers]);
};

export { useErrors, useAsyncMutation, useSocketEvents };
