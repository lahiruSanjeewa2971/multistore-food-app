"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Store } from "@/types-db";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, StoreIcon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { StoreListItem } from "./store-list-item";
import { useStoreModal } from "@/hooks/use-store-modal";
import { CreateNewStoreItem } from "./create-store-item";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[];
}

const StoreSwitcher = ({ items }: StoreSwitcherProps) => {
  const [open, setOpen] = useState(false);
  const [searchStore, setSearchStore] = useState("");
  const [filtered, setFiltered] = useState<{ label: string; value: string }[]>(
    []
  );
  const params = useParams();
  const router = useRouter();
  const storeModal = useStoreModal();

  const formattedStore = items?.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formattedStore?.find(
    (item) => item.value === params.storeId
  );

  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };

  const handleSearchStore = (e: any) => {
    setSearchStore(e.target.value);
    setFiltered(
      formattedStore.filter((item) =>
        item.label.toLowerCase().includes(searchStore.toLowerCase())
      )
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          <StoreIcon className="mr-2 h-4 w-4" />
          {currentStore?.value
            ? formattedStore?.find(
                (framework) => framework.value === currentStore?.value
              )?.label
            : "Select store..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <div className="flex items-center w-full px-2 py-1 border rounded-md border-gray-100">
            <StoreIcon className="mr-2 h-4 w-4 min-w-4" />
            <input
              className="flex-1 w-full outline-none"
              placeholder="Search Store..."
              onChange={handleSearchStore}
            />
          </div>
          {/* <CommandInput placeholder="Search framework..." /> */}
          {/* <CommandList> */}
          {/* <CommandEmpty>No store found.</CommandEmpty> */}
          <CommandList>
            <CommandGroup heading="Stores">
              {searchStore === "" ? (
                formattedStore.map((item, index) => (
                  <StoreListItem
                    store={item}
                    key={index}
                    onSelect={onStoreSelect}
                    isChecked={currentStore?.value == item.value}
                  />
                ))
              ) : filtered.length > 0 ? (
                filtered.map((item, index) => (
                  <StoreListItem
                    store={item}
                    key={index}
                    onSelect={onStoreSelect}
                    isChecked={currentStore?.value == item.value}
                  />
                ))
              ) : (
                <CommandEmpty>No store found</CommandEmpty>
              )}
            </CommandGroup>
          </CommandList>
          {/* </CommandList> */}
          <CommandSeparator />

          <CommandList>
            <CommandGroup>
                <CreateNewStoreItem 
                onClick={() => { 
                    setOpen(false);
                    storeModal.onOpen()
                }}
                />
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StoreSwitcher;
