export default function (error: any) {
  const { $toast } = useNuxtApp();
  if (!import.meta.client) {
    return;
  }
  const resError = error?.response?._data;
  if (resError?.msg?.spec) {
    $toast.error(resError?.msg?.spec);
  } else {
    $toast.error(error?.message || "Hệ thống đang bảo trì");
  }
}
