import CalendarInput from "@/components/shared/input/CalendarInput";
  const today = new Date();

  {
    /* Vencimento */
  }
  <div className="mt-1 col-span-full sm:col-span-2">
    <div className="p-inputgroup">
      <CalendarInput
        invalid={modalData?.vencimento ? false : true}
        label={"Vencimento"}
        inputClass="w-full"
        value={
          modalData?.vencimento
            ? new Date(
                today.getFullYear(),
                today.getMonth(),
                modalData?.vencimento
              )
            : null
        }
        onChange={(e) => {
          editableItem("vencimento", e.target.value.getDate());
        }}
        format={"dd"}
        view="date"
      />
    </div>
  </div>