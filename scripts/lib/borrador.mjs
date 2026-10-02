// The draft of an entity's design language, with the values the engine computes for its chart.
import { cargarMotor } from './entidades.mjs';
import { borrador } from '../../entidades/borrador.mjs';

export async function borradorDe(dato) {
  const En = await cargarMotor();
  const E = En.withCarta({ id: dato.id, name: dato.nombre, nacimiento: dato.nacimiento, color: dato.colorHeredado || undefined, variation: 0, type: 'proyector', auth: 'mental', profile: '1/3', def: 'simple', centers: [] });
  if (E.cartaError) throw new Error(E.cartaError);
  return borrador(dato, En.params(E));
}
