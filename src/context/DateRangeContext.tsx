// UserContext.tsx
import React, { createContext, ReactNode, useContext, useState } from 'react';

type DateRange = {
    from: Date | undefined;
    to?: Date | undefined;
};

type DateContextType = {
    date: DateRange | undefined;
    setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
};

export const DateContext = createContext<DateContextType | undefined>(undefined);

type DateContextProviderProps = {
    children: ReactNode;
};

export const DateContextProvider = ({ children }: DateContextProviderProps) => {
    const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

    return (
        <DateContext.Provider value={{ date, setDate }}>
            {children}
        </DateContext.Provider>
    );
};