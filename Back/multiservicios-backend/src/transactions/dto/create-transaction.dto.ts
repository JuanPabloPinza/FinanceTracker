export class DtoCreateTransaction {
      tipoTransaccion: 'Ingreso' | 'Egreso';
      nombreIngreso: string;
      categoriaId?: number; // Opcional
      clienteId?: number; // Opcional
      descripcionIngreso?: string;
      tipoDePago: 'Efectivo' | 'Tarjeta' | 'Transferencia';
      fechaPago: Date;
      totalPago: number;
      estado: 'Pagado' | 'Con Deuda';
    }